# Hello NEAR Contract

The smart contract exposes two methods to enable storing and retrieving a greeting in the NEAR network.

```rust
const DEFAULT_GREETING: &str = "Hello";

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    greeting: String,
}

impl Default for Contract {
    fn default() -> Self {
        Self{greeting: DEFAULT_GREETING.to_string()}
    }
}

#[near_bindgen]
impl Contract {
    // Public: Returns the stored greeting, defaulting to 'Hello'
    pub fn get_greeting(&self) -> String {
        return self.greeting.clone();
    }

    // Public: Takes a greeting, such as 'howdy', and records it
    pub fn set_greeting(&mut self, greeting: String) {
        // Record a log permanently to the blockchain!
        log!("Saving greeting {}", greeting);
        self.greeting = greeting;
    }
}
```

<br />

# Quickstart

1. Make sure you have installed [rust](https://rust.org/).
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. Build and Deploy the Contract
You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
./deploy.sh
```

Once finished, check the `neardev/dev-account` file to find the address in which the contract was deployed:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<br />

## 2. Retrieve the Greeting

`get_greeting` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the greeting
near view <dev-account> get_greeting
```

<br />

## 3. Store a New Greeting
`set_greeting` changes the contract's state, for which it is a `change` method.

`Change` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to set a new greeting
near call <dev-account> set_greeting '{"message":"howdy"}' --accountId <dev-account>
```

**Tip:** If you would like to call `set_greeting` using your own account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account>`.
<!-- //user init product->Product(campaign_id)
//expected: 
//-Campaign: be created -> calculate progress -> calculate percentage of producer's product-> end campaign -> send token to producer and collector
//done: 
//-Campaign: be created campaign
//-Producer: create user -> push product
//-Collector: create user-> register collector -> apply to an campaign -> validate
//-product: be created-> be validated -> be confirmed
//*  reward: % đóng góp * fund = 80% producer + 20% collector
//fix update camp
near call dev-1690113733666-73064811293791 new_product '{"name": "Vechais", "description":"vc", "image":"iameg", "camp_id":"f37d33c078512841956918576d4b0aa849fc7d96251d4b8dec67502fa461b828"}'  --accountId quiblc.testnet

f37d33c078512841956918576d4b0aa849fc7d96251d4b8dec67502fa461b828 -->