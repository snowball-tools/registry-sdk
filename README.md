# laconic-client

## Tests

Follow these steps to run the tests:

- After cloning this repo run:

  ```bash
  yarn
  ```

- Copy [.env.example](./.env.example) file and create a `.env` file.

- Clone the [laconicd repo](https://github.com/cerc-io/laconicd) and change to repo directory.

- Run the chain using `./init.sh`.

- Export the private key using:

  ```bash
  laconicd keys export mykey --unarmored-hex --unsafe
  ```

- Copy the private key and assign it to variable `PRIVATE_KEY` in the `.env` file.

- Run the tests in laconic-client repo:

  ```bash
  yarn test
  ```

- Run the tests with auctions enabled

  - In laconicd repo run:

    ```bash
    TEST_AUCTION_ENABLED=true ./init.sh
    ```

  - Export the private key and change it in `.env` file again using:

    ```bash
    laconicd keys export mykey --unarmored-hex --unsafe
    ```

  - Run tests:

    ```bash
    yarn test:auctions
    ```

- Run the tests for record and authority expiry

  - In laconicd repo run:

    ```bash
    TEST_NAMESERVICE_EXPIRY=true ./init.sh
    ```

  - Export the private key and change it in `.env` file again using:

    ```bash
    laconicd keys export mykey --unarmored-hex --unsafe
    ```

  - Run tests:

    ```bash
    yarn test:nameservice-expiry
    ```

## Development

[README](./DEVELOPMENT.md)

## Known Issues

- Passing a float type value in [watcher attributes](./src/testing/data/watcher.yml) throws error when sending `setRecord` message.
  ```
  failed to execute message; message index: 0: Invalid signature.: unauthorized
  ```

- When sending `setRecord` message, an integer value passed in watcher attributes is parsed as float type in laconicd while [unmarshalling json](https://pkg.go.dev/encoding/json#Unmarshal).

- `setRecord` message throws error when fileds in [Record](./src/types.ts) message are not assigned.
  ```
  failed to pack and hash typedData primary type: provided data '<nil>' doesn't match type 'string' [tharsis/ethermint/ethereum/eip712/eip712.go:33]
  ```
  Passing dummy values to work around issue.
