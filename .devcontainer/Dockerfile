# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.231.1/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

#RUN Custom Script
ARG USERNAME=node

COPY toyscript.sh /tmp/custom-scripts/
RUN bash /tmp/custom-scripts/toyscript.sh "${USERNAME}"\
    && rm -rf /tmp/custom-scripts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      /lib/apt/lists/*
COPY .p10k.zsh .zshrc /home/${USERNAME}/
RUN exec zsh

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"


git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch /src/environments/environment.ts' --prune-empty --tag-name-filter cat -- --all