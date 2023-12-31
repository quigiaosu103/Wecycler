# Hello NEAR Contract


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
**Contract callMethod:**
New account:
```bash
# You need to create new account to user services
near call dev-1690642410974-51262377694618 new_user --accountId your_account_id
```
Create campaign:
```bash
# Ceate new campaign
near call dev-1690642410974-51262377694618 new_camp '{"id": id_of_campaign, "fund": pool stake, "title": title_of_campaign, "content": description_of_campaign, "image": link_of_image, "amount": total_product_expected, "init_time": init_time_of_campaign, "deadline": deadline_of_campaign}'  --accountId your_account_id --amount pool stake token
```

Create new collector:
```bash
# Switch role of your account become collector
near call dev-1690642410974-51262377694618 new_collector --accountId your_account_id
```

Collector apply to campaign:
```bash
# Collector apply to campaign
near call dev-1690642410974-51262377694618 apply_collector_in_camp '{"camp_id": id_of_campaign}"  --accountId your_account_id --amount your stake(10% of pool stake of campaign)
```

Owner of campaign change campaign's status:
```bash
# Change status
near call dev-1690642410974-51262377694618 set_camp_status '{"status": new_status,""camp_id": id_of_campaign}"  --accountId your_account_id 
```

Owner of campaign change campaign's status:
```bash
# Change status
near call dev-1690642410974-51262377694618 set_camp_status '{"status": new_status,""camp_id": id_of_campaign}"  --accountId your_account_id 
```

<<<<<<< HEAD

Add product to a campaign:
```bash
# Add product
near call dev-1690642410974-51262377694618 new_product '{"name": "product_name","description": "your products description","image": "link of image", "total_supply": 8, "camp_id": "daylanewid"}' --accountId your_accountId
=======
Add product to a campaign:
```bash
# Add product
near call dev-1690642410974-51262377694618 new_product '{"name": product_name,"description": your products description,"image": link of image, "total_supply": amount of product, "camp_id": id_of_campaign}' --accountId your_accountId
>>>>>>> 185f2dd3d6e10dac6a6daaf674eecfc39d0c72b2
```

Collector validate product:
```bash
# Change state fof product
near call dev-1690642410974-51262377694618 new_product '{"id": product_id, "camp_id": id of campaign, "status": bool_value}' --accountId your_accountId
```

**View methods:**

To see all campaigns:
```bash
# Change state fof product
near view dev-1690642410974-51262377694618 get_all_campaigns  --accountId your_accountId
```

To see all products of a campaign:
```bash
# Change state fof product
near view dev-1690642410974-51262377694618 get_poducts_by_campaign '{"id": campaign_id}'  --accountId your_accountId
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


f37d33c078512841956918576d4b0aa849fc7d96251d4b8dec67502fa461b828 -->

<<<<<<< HEAD
<<<<<<< HEAD
//near call dev-1690642410974-51262377694618 apply_collector_in_camp {"camp_id": "daylanewid"}'  --accountId quivok8t.testnet
=======
//:
>>>>>>> 9066ebf386070bef296087a0ed8d9e345819b4eb
=======
//:
>>>>>>> 185f2dd3d6e10dac6a6daaf674eecfc39d0c72b2
