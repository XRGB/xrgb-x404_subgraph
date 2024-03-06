
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { X404Created } from "../generated/X404Hub/X404Hub";
import { X404, X404Hub } from "../generated/schema";
import { X404 as X404Template } from "../generated/templates";
import { X404Hub_ADDRESS } from "./utils/constants";

export function handleX404Created(event: X404Created): void {
    let x404Hub = X404Hub.load(Address.fromString(X404Hub_ADDRESS))
    if (x404Hub === null) {
        x404Hub = new X404Hub(Address.fromString(X404Hub_ADDRESS));
        x404Hub.x404Count = BigInt.fromI32(1);
    }
    x404Hub.x404Count = x404Hub.x404Count.plus(BigInt.fromI32(1));
    let x404 = new X404(event.params.addr) as X404
    x404.addr = event.params.addr
    x404.blueChipNftAddr = event.params.blueChipNftAddr
    x404.creator = event.params.creator
    x404.nftAmounts = BigInt.fromI32(0)

    x404.save()
    X404Template.create(event.params.addr)
    x404Hub.save()
}