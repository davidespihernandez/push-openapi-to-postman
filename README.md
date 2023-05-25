# publish-openapi-to-postman

Pushes an OpenAPI definition in your repository to Postman, creating a new version on an existing API.


## Usage
Example of manual trigger, asking for the required inputs.

```yaml
name: Sync OpenAPI with Postman
on:
  workflow_dispatch:
    inputs:
      pathToDefinition:
        description: 'Path to the OpenAPI definition file in the repository'
        required: true
        default: './openAPI.json'
      apiId:
        description: 'Postman API ID'
        required: true
        default: 'String'
      schemaId:
        description: 'Postman schema id on the previous API'
        required: true
        default: 'String'
      versionName:
        description: 'The new version name'
        required: true
        default: '1.0.0'
      releaseNotes:
        description: 'The new version release notes'
        required: false
        default: ''
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Push OpenAPI to Postman
        id: pushApi
        uses: davidespihernandez/push-openapi-to-postman@v1
        with:
          path-to-definition: ./openApi.json
          postman-api-key: ${{ secrets.POSTMAN_API_KEY }}
          api-id: ${{ github.event.inputs.apiId }}
          schema-id: ${{ github.event.inputs.schemaId }}
          api-path-to-file-name: index.json
          version-name: ${{ github.event.inputs.versionName }}
          release-notes: ${{ github.event.inputs.releaseNotes }}
```

## License

MIT

