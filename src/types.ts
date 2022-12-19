import assert from 'assert';
import { Validator } from 'jsonschema';

import RecordSchema from './schema/record.json';
import { Util } from './util';
import * as attributes from './proto/vulcanize/nameservice/v1beta1/attributes';
import * as any from './proto/google/protobuf/any';

/**
 * Record.
 */
export class Record {
  _record: any

  /**
   * New Record.
   */
  constructor(record: any) {
    assert(record);

    const validator = new Validator();
    const result = validator.validate(record, RecordSchema);
    if (!result.valid) {
      result.errors.map(console.error);
      throw new Error('Invalid record input.');
    }

    this._record = record;
  }

  get attributes() {

    var a = new any.google.protobuf.Any()

    if (this._record.type=="WebsiteRegistrationRecord"){
      var attr= new attributes.vulcanize.nameservice.v1beta1.WebsiteRegistrationRecord(this._record)
      a= new any.google.protobuf.Any({
        type_url: "/vulcanize.nameservice.v1beta1.WebsiteRegistrationRecord",
        value: attr.serialize()
      })
    }
    return a
  }

  /**
   * Serialize record.
   */
  serialize() {
    return {
      'id': '_',
      'bond_id': '_',
      'create_time': '_',
      'expiry_time': '_',
      // Setting deleted as false (zero value) throws error in EIP712 signature verification.
      'deleted': true,
      'attributes': this.attributes,
    }
  }

  /**
   * Get message to calculate record signature.
   */
  getMessageToSign() {
    return Util.sortJSON(this._record);
  }
}

/**
 * Record Signature.
 */
export class Signature {
  _pubKey: string
  _sig: string

  /**
   * New Signature.
   */
  constructor(pubKey: string, sig: string) {
    assert(pubKey);
    assert(sig);

    this._pubKey = pubKey;
    this._sig = sig;
  }

  /**
   * Serialize Signature.
   */
  serialize() {
    return Util.sortJSON({
      'pub_key': this._pubKey,
      'sig': this._sig
    });
  }
}

/**
 * Message Payload.
 */
export class Payload {
  _record: Record
  _signatures: Signature[]

  /**
   * New Payload.
   */
  constructor(record: Record, ...signatures: Signature[]) {
    assert(record);

    this._record = record;
    this._signatures = signatures;
  }

  get record() {
    return this._record;
  }

  get signatures() {
    return this._signatures;
  }

  /**
   * Add message signature to payload.
   */
  addSignature(signature: any) {
    assert(signature);

    this._signatures.push(signature);
  }

  /**
   * Serialize Payload.
   */
  serialize() {
    // return Util.sortJSON({
    // });
    return {
      'record': this._record.serialize(),
      'signatures': this._signatures.map(s => s.serialize())
    }
  }
}
