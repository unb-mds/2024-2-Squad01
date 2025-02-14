-- CreateTable
CREATE TABLE "User" (
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "whatsApp" TEXT,
    "instagram" TEXT,
    "descricao" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "descricao" TEXT,
    "status" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "foto" TEXT,
    "data_de_publicacao" TIMESTAMP(3) NOT NULL,
    "data_de_conclusao" TIMESTAMP(3),
    "email_cliente" TEXT,
    "email_publicador" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "initDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderEmail" TEXT NOT NULL,
    "receiverEmail" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nome_key" ON "User"("nome");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_email_cliente_fkey" FOREIGN KEY ("email_cliente") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_email_publicador_fkey" FOREIGN KEY ("email_publicador") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_senderEmail_fkey" FOREIGN KEY ("senderEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_receiverEmail_fkey" FOREIGN KEY ("receiverEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
