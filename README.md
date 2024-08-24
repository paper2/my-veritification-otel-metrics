検証のメモのためのリポジトリ

# 検証内容
- [OpenTelemetry Collector の Span Metrics Connector を使ってメトリクスを生成してみる](https://zenn.dev/k6s4i53rx/articles/2023-advent-calender-otel)
- [Node.js Getting Started| OpenTelemetry](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)


# set up
- google projectを作成
- cloud buildのサービスアカウントでcloud run deployの権限を付与
- ./collector/deploy.shでcollectorをdeploy
- 以下の環境変数設定

```
export OTEL_SERVICE_NAME=test-app-node
export OTEL_LOG_LEVEL=debug
export export OTEL_EXPORTER_OTLP_ENDPOINT=https://<cloud runのURL>
```


- run

```
 npx ts-node --require ./instrumentation.ts app.ts
```