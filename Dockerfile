FROM node:24-bookworm-slim AS deps
WORKDIR /workspace
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
COPY package.json pnpm-workspace.yaml ./
COPY app/package.json app/package.json
RUN pnpm install --frozen-lockfile=false

FROM node:24-bookworm-slim AS build
WORKDIR /workspace
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/app/node_modules ./app/node_modules
COPY . .
RUN pnpm build

FROM node:24-bookworm-slim AS runner
WORKDIR /workspace
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
ENV AI_DATA_DIR=/data
RUN corepack enable
COPY package.json pnpm-workspace.yaml ./
COPY app/package.json app/package.json
COPY --from=build /workspace/app/dist app/dist
COPY --from=deps /workspace/app/node_modules app/node_modules
VOLUME ["/data"]
EXPOSE 4321
CMD ["node", "app/dist/server/entry.mjs"]
