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

    console.log("🔥 ➡️ HERE:", context.payload);

    if (!context.payload.pull_request) {
      console.log(
        "The event that triggered this action was not a pull request, skipping."
      );
      console.log(
        "(If this is unexpected make sure you are triggering your workflow for the pull_request event)"
      );
      return;
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
