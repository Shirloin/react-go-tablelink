import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

const GRPC_URL = import.meta.env.VITE_GRPC_URL || "http://localhost:50051";

export const grpcTransport = new GrpcWebFetchTransport({
  baseUrl: GRPC_URL,
  format: 'binary',
});
