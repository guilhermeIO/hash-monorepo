# :books: Table of contents
1. [Installation](#installation)
1. [Testing](#testing)
1. [File Structure Overview](#file-structure-overview)

# Installation

The following technologies are **required and expected to be already installed** on the host system:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Docker](https://docs.docker.com/install)
* [Make](https://www.gnu.org/software/make/#download)

**Clone** the repository
```
$ git clone git@github.com:guilhermeIO/hash-monorepo.git
```

Inside the *infrastructure directory*, **provision the infrastructure**
```
$ make up
```

# Testing

Inside the *infrastructure directory*, **test all services**:
```
$ make test
```

:information_source: To **test a specific service**, read it's corresponding README file.

# Repository Structure Overview

## Services
Each service lives on it's own directory and is prefixed with it's main language (i.e. **node**-products-discount, **php**-http-api).

## Protocol Buffers
All protocol buffer files reside in the **`protobufs`** directory.

## Infrastructure
Holds the file that composes the whole infrastructure for development environment (**docker-compose.yaml**).

Also, provides a collection of useful commands - located at the file **Makefile**.

:information_source: Each service holds it's infrastructure specification under it's own **_docker** folder.
