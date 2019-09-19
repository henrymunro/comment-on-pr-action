# Comment on Pull Request

A github action to comment on the pull request that triggers this action. If a none pull_request event triggers this action, it returns without doing anything.

# Usage

Triggered by: 
```yml
on: [pull_request]
```

```yml
steps:
- uses: henrymunro/comment-on-pr-action@v1
    with:
    repo-token: ${{ secrets.GITHUB_TOKEN }}
    pr-message: 🤖🚀 Message that will appear on your pull request, complete with `markdown`
```