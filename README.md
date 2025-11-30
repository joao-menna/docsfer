# docsfer

File data transfer based on cloud.

Architecture:
- Monolith: Application.
- Migrator: Database migrations
- Nginx: Reverse proxy.
- PostgreSQL: Database.
- Azurite (Azure Blob Storage) (dev): File hosting.
- Smtp4dev (dev): SMTP test server.

External Modules:
- SMTP: SendGrid

[Preview em Vídeo](https://youtu.be/vKeBonz-KEE)

Requisitos funcionais (os checkboxes ativos foram implementados):
- [X] RF001: O sistema deve permitir a autenticação do usuário por Microsoft Entra ID.
- [X] RF002: O sistema deve permitir a troca de arquivos entre usuários singulares. e.g.: José e Carlos.
- [X] RF003: O sistema deve permitir a troca de arquivos entre usuários singulares e grupos de usuários. e.g.: José e RH.
- [X] RF004: O sistema deve permitir a troca de arquivos entre grupos de usuários. e.g.: RH e Financeiro.
- [X] RF005: O sistema deve permitir o versionamento de arquivos. e.g.: Arquivo X v1.0, o usuário sobe uma versão do mesmo arquivo, Arquivo X v2.0
- [ ] RF006: O sistema deve permitir a troca de mensagens dentro do mesmo arquivo.
- [ ] RF007: O sistema deve enviar mensagens do próprio sistema, como "nova versão criada", dentro do mesmo arquivo.
- [X] RF008: O sistema deve enviar um e-mail anunciando a chegada de um novo arquivo compartilhado ao usuário.
- [X] RF009: O sistema deve enviar um e-mail anunciando a chegada de um novo arquivo compartilhado ao participante do grupo.

Requisitos não funcionais (os checkboxes ativos foram cumpridos):
- [X] RNF001: O sistema deve responder em até 2 segundos.
- [ ] RNF002: O sistema deve possuir a interface responsiva.
- [X] RNF003: O sistema deve suportar os navegadores mais avançados do mercado (Firefox, Chrome e Edge).
- [X] RNF004: O sistema deve possuir a estilização feita com TailwindCSS para facilidade de manutenção.
- [X] RNF005: O sistema deve possuir o back-end na linguagem C# utilizando ASP.NET Core para o cliente conseguir fazer manutenção.

## Interface

[https://www.figma.com/design/5LO64ti0SpsSKkhRa19S5G/PAC5?node-id=0-1&t=vqG7VfFPPsjHRJFP-1](https://www.figma.com/design/5LO64ti0SpsSKkhRa19S5G/PAC5?node-id=0-1&t=vqG7VfFPPsjHRJFP-1)

## Diagrama ER v1.0

![ER Diagram](docs/images/er_diagram_v1.png)

## Diagrama de Contexto

![Context Diagram](docs/images/context_c4_diagram.png)

## Diagrama de Contêiner

![Container Diagram](docs/images/container_c4_diagram.png)

## Diagrama de Componentes

![Components Diagram](docs/images/component_c4_diagram.png)

## Diagrama de Classes

![Class Diagram](docs/images/class_diagram.png)
