import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Initialized,
  OwnershipTransferred,
  X404Created
} from "../generated/X404Hub/X404Hub"

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createX404CreatedEvent(
  addr: Address,
  blueChipNftAddr: Address,
  creator: Address,
  nftUnits: BigInt
): X404Created {
  let x404CreatedEvent = changetype<X404Created>(newMockEvent())

  x404CreatedEvent.parameters = new Array()

  x404CreatedEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  x404CreatedEvent.parameters.push(
    new ethereum.EventParam(
      "blueChipNftAddr",
      ethereum.Value.fromAddress(blueChipNftAddr)
    )
  )
  x404CreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  x404CreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftUnits",
      ethereum.Value.fromUnsignedBigInt(nftUnits)
    )
  )

  return x404CreatedEvent
}
