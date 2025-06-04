describe("API de Usuários - Serverest/Login", () => {
  let token = "";
  let userId = "";
  let emailAdmin = `jhonatankoskaqa_${Date.now()}@admin.com`;
  let emailUsuario = `jhonatankoskanovo_${Date.now()}@usuario.com`;

  before(() => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Jhonatan Koska",
        email: emailAdmin,
        password: "teste123",
        administrador: "true",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("message", "Cadastro realizado com sucesso");

      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: emailAdmin,
          password: "teste123",
        },
      }).then((loginRes) => {
        expect(loginRes.status).to.eq(200);
        expect(loginRes.body).to.have.property("message", "Login realizado com sucesso");
        token = loginRes.body.authorization;
      });
    });
  });

  it("Deve criar um novo usuário", () => {
    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Jhonatan Koska Novo",
        email: emailUsuario,
        password: "123456",
        administrador: "false",
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body._id;
    });
  });

  it("Deve listar os usuários e validar os dados do administrador cadastrado", () => {
  cy.request("/usuarios").then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property("usuarios");
    expect(res.body.usuarios).to.be.an("array");

    const usuarioAdmin = res.body.usuarios.find((u) => u.email === emailAdmin);

    expect(usuarioAdmin).to.exist;
    expect(usuarioAdmin).to.have.property("nome", "Jhonatan Koska");
    expect(usuarioAdmin).to.have.property("email", emailAdmin);
    expect(usuarioAdmin).to.have.property("password", "teste123");
    expect(usuarioAdmin).to.have.property("administrador", "true");
    expect(usuarioAdmin).to.have.property("_id").and.to.be.a("string").and.not.to.be.empty;
  });
});


  it("Deve obter um usuário por ID", () => {
    cy.request(`/usuarios/${userId}`).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property("nome", "Jhonatan Koska Novo");
    expect(res.body).to.have.property("email", emailUsuario);
    expect(res.body).to.have.property("password", "123456");
    expect(res.body).to.have.property("administrador", "false");
    expect(res.body).to.have.property("_id", userId);

    });
  });

  it("Deve atualizar um usuário", () => {
    cy.request({
      method: "PUT",
      url: `/usuarios/${userId}`,
      headers: { Authorization: token },
      body: {
        nome: "Usuário Atualizado",
        email: `atualizado_${Date.now()}@usuario.com`,
        password: "123456",
        administrador: "true",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("message", "Registro alterado com sucesso");

    });
  });

  it("Deve deletar um usuário", () => {
    cy.request({
      method: "DELETE",
      url: `/usuarios/${userId}`,
      headers: { Authorization: token },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("message", "Registro excluído com sucesso");
    });
  });
});
