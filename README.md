<h1>Trybe Futebol Clube</h1>
<p>Este projeto foi desenvolvido em dezembro de 2022 durante meus estudos na <a href="https://www.betrybe.com/">Trybe</a>.</p>

<br/>

<h2>O quê foi desenvolvido</h2>
<p>Com auxílio de Docker containers foi desenvolvida uma aplicação Full Stack que permite usuários acompanharem placares de jogos de futebol. É possível entrar como usuário comum para consumir os dados ou efetuar login como administrador para poder editar ou adicionar novas partidas.</p>
<p>O Front-end da aplicação foi desenvolvido pela <a href="https://www.betrybe.com/">Trybe</a> e já estava pronto para consumir os dados necessários. Meu papel nesse projeto foi desenvolver todo o Back-end para fornecer os dados corretos, assim como garantir a cobertura de testes da aplicação e o bom funcionamento dos containers Docker.</p>
<br/>
  
<h2>O quê foi avaliado</h2>
<ul>
  <li>Realização da dockerização dos apps, network, volume e compose;</li>
  <li>Modelagem de dados com MySQL através do Sequelize;</li>
  <li>Criação e associação de tabelas usando models do sequelize;</li>
  <li>Construção de uma API REST com endpoints para consumir os models criados;</li>
  <li>Construção de um CRUD com TypeScript, utilizando ORM.</li>
</ul>

<br/>

<h2>Guia de instalação</h2> 
<ol>
  <li>
    <p>Clone o repositório</p>
    <pre>git clone git@github.com:celso-rodrigo/trybe-futebol-clube.git</pre>
  </li>
  <li>
    <p>Abra a pasta do repositório</p>
  </li>
  <li>
    <p>Instale as dependências</p>
    <pre>npm install</pre>
  </li>
  <li>
    <p>Suba os Docker containers</p>
    <pre>npm run compose:up</pre>
  </li>
  <li>
    <p>Acesse a aplicação pelo navegador</p>
    <a href="http://localhost:3000/">localhost:3000</a>
  </li>
  <li>
    <p>Efetue o login</p>
    
  <table>
    <tr>
      <th>Tipo de Usuário</th>
      <th>Email</th>
      <th>Senha</th>
    </tr>
    <tr>
      <td>Administrador</td>
      <td>admin@admin.com</td>
      <td>secret_admin</td>
    </tr>
    <tr>
      <td>Comum</td>
      <td>user@user.com</td>
      <td>secret_user</td>
    </tr>
  </table>
  </li>
</ol>
