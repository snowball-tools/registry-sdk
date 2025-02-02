import { Registry, Account, createBid } from './index';
import { getConfig } from './testing/helper';
import { DENOM } from './constants';

jest.setTimeout(30 * 60 * 1000);
const { chainId, rpcEndpoint, gqlEndpoint, privateKey, fee } = getConfig();

const auctionTests = (numBidders = 3) => {
  let registry: Registry;

  const accounts: { address: string, privateKey: string, bid?: any }[] = [];

  let auctionId: string;
  let authorityName: string;

  beforeAll(async () => {
    console.log('Running auction tests with num bidders', numBidders);

    registry = new Registry(gqlEndpoint, rpcEndpoint, chainId);
  });

  test('Setup bidder accounts', async () => {
    for (let i = 0; i < numBidders; i++) {
      const mnenonic = Account.generateMnemonic();
      const account = await Account.generateFromMnemonic(mnenonic);
      await account.init();
      await registry.sendCoins({ denom: DENOM, amount: '20000000', destinationAddress: account.address }, privateKey, fee);
      accounts.push({ address: account.address, privateKey: account.privateKey.toString('hex') });
    }
  });

  test('Reserve authority.', async () => {
    authorityName = `laconic-${Date.now()}`;
    await registry.reserveAuthority({ name: authorityName }, accounts[0].privateKey, fee);
  });

  test('Authority should be under auction.', async () => {
    const [record] = await registry.lookupAuthorities([authorityName], true);
    expect(record.ownerAddress).toEqual('');
    expect(record.height).toBeDefined();
    expect(record.status).toEqual('auction');

    expect(record.auction.id).toBeDefined();
    expect(record.auction.status).toEqual('commit');

    auctionId = record.auction.id;
  });

  test('Commit bids.', async () => {
    for (let i = 0; i < numBidders; i++) {
      accounts[i].bid = await createBid(chainId, auctionId, accounts[i].address, `${10000000 + (i * 500)}${DENOM}`);
      await registry.commitBid({ auctionId, commitHash: accounts[i].bid.commitHash }, accounts[i].privateKey, fee);
    }
  });

  test('Check bids are committed', async () => {
    const [record] = await registry.lookupAuthorities([authorityName], true);
    expect(record.auction.id).toBeDefined();
    expect(record.auction.status).toEqual('commit');
    expect(record.auction.bids).toHaveLength(accounts.length);

    record.auction.bids.forEach((bid: any) => {
      expect(bid.status).toEqual('commit');
    });
  });

  test('Wait for reveal phase.', (done) => {
    setTimeout(done, 60 * 1000);
  });

  test('Reveal bids.', async () => {
    const [auction] = await registry.getAuctionsByIds([auctionId]);
    expect(auction.status).toEqual('reveal');

    for (let i = 0; i < numBidders; i++) {
      await registry.revealBid({ auctionId, reveal: accounts[i].bid.revealString }, accounts[i].privateKey, fee);
    }
  });

  test('Check bids are revealed', async () => {
    const [auction] = await registry.getAuctionsByIds([auctionId]);
    expect(auction.status).toEqual('reveal');

    auction.bids.forEach((bid: any) => {
      expect(bid.status).toEqual('reveal');
    });
  });

  test('Wait for auction completion.', (done) => {
    setTimeout(done, 60 * 1000);
  });

  test('Check auction winner, authority owner and status.', async () => {
    const [auction] = await registry.getAuctionsByIds([auctionId]);
    expect(auction.status).toEqual('completed');

    const highestBidder = accounts[accounts.length - 1];
    const secondHighestBidder = (accounts.length > 1 ? accounts[accounts.length - 2] : highestBidder);

    expect(auction.winnerAddress).toEqual(highestBidder.address);
    expect(highestBidder.bid.reveal.bidAmount).toEqual(`${auction.winnerBid.quantity}${auction.winnerBid.type}`);
    expect(secondHighestBidder.bid.reveal.bidAmount).toEqual(`${auction.winnerPrice.quantity}${auction.winnerPrice.type}`);

    const [record] = await registry.lookupAuthorities([authorityName], true);
    expect(record.ownerAddress).toEqual(highestBidder.address);
    expect(record.height).toBeDefined();
    expect(record.status).toEqual('active');
  });
};

const withNumBidders = (numBidders: number) => () => auctionTests(numBidders);

if (!process.env.TEST_AUCTIONS_ENABLED) {
  // Required as jest complains if file has no tests.
  test('skipping auction tests', () => {});
} else {
  /**
    Running these tests requires name auctions enabled. In laconicd repo run:

    TEST_AUCTION_ENABLED=true ./init.sh

    Run tests:

    yarn test:auctions
  */
  describe('Auction (1 bidder)', withNumBidders(1));
  describe('Auction (2 bidders)', withNumBidders(2));
  describe('Auction (4 bidders)', withNumBidders(4));
}
