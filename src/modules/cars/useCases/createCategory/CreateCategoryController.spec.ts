import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;
describe("Create category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
                values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "test_name",
                description: "test_description",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });
});
