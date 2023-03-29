-- AlterTable
CREATE SEQUENCE todo_id_seq;
ALTER TABLE "Todo" ALTER COLUMN "id" SET DEFAULT nextval('todo_id_seq'),
ALTER COLUMN "status" SET DEFAULT false;
ALTER SEQUENCE todo_id_seq OWNED BY "Todo"."id";
