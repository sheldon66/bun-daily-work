import postgres from "postgres";
import { uid } from "uid";
const sql = postgres(
  "postgres://nocobase:nocobase@localhost:5432/nocobase_mobile"
);

async function MockChannels({ totalNum }) {
  const channelsData = Array.from({ length: totalNum }).map((val, idx) => {
    return {
      name: `s_${uid(8)}`,
      title: `站内信渠道-${idx}`,
      notification_type: "in-app-message",
      created_by_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  await sql`insert into public.notification_channels ${sql(
    channelsData,
    "name",
    "title",
    "notification_type",
    "created_by_id",
    "created_at",
    "updated_at"
  )}`;
  return channelsData;
}

async function main() { 
  await sql`truncate table public.notification_in_app_messages, public.notification_channels RESTART IDENTITY`;
  
  const channels = await MockChannels({ totalNum: 100 });
  const messages = channels.map((channel, idx) => {
    return {
      id: crypto.randomUUID(),
      channel_name: channel.name,
      title: "站内信标题",
      content: `站内信内容-${channel.name}`,
      status: "unread",
      receive_timestamp: 1730525317816-idx*10000000,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  await sql`insert into public.notification_in_app_messages ${sql(
    messages,
    "id",
    "channel_name",
    "title",
    "content",
    "status",
    "receive_timestamp",
    "user_id",
    "created_at",
    "updated_at"
  )}`;
  console.log("Mocked data inserted successfully.");
  return  await sql.end();
}
await main();
