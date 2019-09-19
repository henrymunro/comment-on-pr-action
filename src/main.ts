import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const prMessage: string = core.getInput("pr-message");

    // Get client and context
    const client: github.GitHub = new github.GitHub(
      core.getInput("repo-token", { required: true })
    );
    const context = github.context;

    if (!context.payload.pull_request) {
      throw new Error("Action can only be used on PRs.");
    }

    const { number, owner, repo } = context.issue;

    console.log(`Adding message: ${prMessage} to pull request ${number}`);

    await client.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      body: prMessage,
      event: "COMMENT"
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
