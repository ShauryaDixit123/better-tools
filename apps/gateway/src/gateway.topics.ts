// import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
// import { CHAT_SERVICE_NAME } from "common/constants/service";
// import { Kafka } from "kafkajs";

// @Injectable()
// export class KafkaGatewayTopic implements OnModuleInit {
//   constructor() {}
//   async onModuleInit() {
//     try {
//       const kafka = new Kafka({
//         clientId: "tools-client",
//         brokers: ["localhost:9093"],
//       });
//       const admin = kafka.admin();
//       await admin.connect();
//       console.log("connected");
//       await admin.createTopics({
//         topics: [
//           {
//             topic: "chat",
//             numPartitions: 2,
//           },
//         ],
//       });
//       console.log("topic created");
//       await admin.disconnect();
//     } catch (e) {
//       Logger.log(e, "error");
//       throw new e();
//     }
//   }
// }
