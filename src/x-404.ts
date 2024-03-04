import { X404DepositNFT, X404RedeemNFT } from "../generated/templates/X404/X404";
import { Deposit, Redeem, X404 } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleX404DepositNFT(event: X404DepositNFT): void {
    let x404Address = event.address
    let x404 = X404.load(x404Address)
    if(x404 == null){
        return
    }

    let deposit = new Deposit(event.transaction.hash.concatI32(event.params.tokenId.toI32()))

    x404.nftAmounts = x404.nftAmounts.plus(BigInt.fromI32(1));

    deposit.x404 = x404.id
    deposit.caller = event.params.caller
    deposit.from = event.params.from
    deposit.redeemDeadline = event.params.redeemDeadline
    deposit.tokenId = event.params.tokenId
    deposit.blockNumber = event.block.number
    deposit.blockTimestamp = event.block.timestamp

    deposit.save()
    x404.save()
}

export function handleX404RedeemNFT(event: X404RedeemNFT): void {
    let x404Address = event.address
    let x404 = X404.load(x404Address)
    if(x404 == null){
        return
    }

    let redeem = new Redeem(event.transaction.hash.concatI32(event.params.tokenId.toI32()))

    if (x404.nftAmounts.gt(BigInt.fromI32(0))) {   
        x404.nftAmounts = x404.nftAmounts.minus(BigInt.fromI32(1));
    }

    redeem.x404 = x404.id
    redeem.redeemer = event.params.redeemer
    redeem.tokenId = event.params.tokenId
    redeem.blockNumber = event.block.number
    redeem.blockTimestamp = event.block.timestamp

    redeem.save()
    x404.save()
}