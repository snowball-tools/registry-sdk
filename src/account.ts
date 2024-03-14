import assert from 'assert';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from 'bip39';
import canonicalStringify from 'canonical-json';
import secp256k1 from 'secp256k1';
import { sha256 } from 'js-sha256';

import { toHex } from '@cosmjs/encoding';
import { encodeSecp256k1Pubkey } from '@cosmjs/amino';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';

const AMINO_PREFIX = 'EB5AE98721';
const HDPATH = "m/44'/60'/0'/0";
const ACCOUNT_PREFIX = 'laconic';

const bip32 = BIP32Factory(ecc);

/**
 * Registry account.
 */
export class Account {
  _privateKey: Buffer;
  _publicKey!: Uint8Array;
  _encodedPubkey!: string;
  _registryPublicKey!: string;
  _wallet!: DirectSecp256k1Wallet;
  _address!: string;

  /**
   * Generate bip39 mnemonic.
   */
  static generateMnemonic () {
    return bip39.generateMnemonic();
  }

  /**
   * Generate private key from mnemonic.
   */
  static async generateFromMnemonic (mnemonic: string) {
    assert(mnemonic);

    const seed = await bip39.mnemonicToSeed(mnemonic);
    const wallet = bip32.fromSeed(seed);
    const account = wallet.derivePath(HDPATH);
    const { privateKey } = account;
    assert(privateKey);

    return new Account(privateKey);
  }

  /**
   * New Account.
   */
  constructor (privateKey: Buffer) {
    assert(privateKey);
    this._privateKey = privateKey;
  }

  get privateKey () {
    return this._privateKey;
  }

  get encodedPubkey () {
    return this._encodedPubkey;
  }

  get registryPublicKey () {
    return this._registryPublicKey;
  }

  get address () {
    return this._address;
  }

  get wallet () {
    return this._wallet;
  }

  async init () {
    this._wallet = await DirectSecp256k1Wallet.fromKey(
      this._privateKey,
      ACCOUNT_PREFIX
    );

    const [account] = await this._wallet.getAccounts();
    this._address = account.address;

    // Generate public key.
    this._publicKey = secp256k1.publicKeyCreate(this._privateKey);
    this._encodedPubkey = encodeSecp256k1Pubkey(this._publicKey).value;

    // Generate registry formatted public key.
    const publicKeyInHex = AMINO_PREFIX + toHex(account.pubkey);
    this._registryPublicKey = Buffer.from(publicKeyInHex, 'hex').toString('base64');
  }

  /**
   * Get private key.
   */
  getPrivateKey () {
    return this._privateKey.toString('hex');
  }

  /**
   * Get record signature.
   */
  async signRecord (record: any) {
    assert(record);

    const recordAsJson = canonicalStringify(record);
    // Double sha256.
    const recordBytesToSign = Buffer.from(sha256(Buffer.from(sha256(Buffer.from(recordAsJson)), 'hex')), 'hex');

    // Sign message
    assert(recordBytesToSign);

    const messageToSignSha256 = sha256(recordBytesToSign);
    const messageToSignSha256InBytes = Buffer.from(messageToSignSha256, 'hex');
    const sigObj = secp256k1.ecdsaSign(messageToSignSha256InBytes, this.privateKey);

    return Buffer.from(sigObj.signature);
  }
}
