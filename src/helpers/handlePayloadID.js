export const handlePayloadID = payloads => {
  const payloadList = payloads;
  const payload = payloadList[payloadList.length - 1];
  return payload.payload_id;
};
