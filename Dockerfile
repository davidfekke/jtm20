FROM node:8.7.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH "$PATH:/root/.yarn/bin"

RUN mkdir /src

COPY package.json /src
WORKDIR /src 
RUN yarn

# Add your source files
COPY . /src  
CMD ["npm","start"]