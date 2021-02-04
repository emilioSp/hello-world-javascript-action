const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');

console.log('c9aooo');

try {
  // `who-to-greet` input defined in action metadata file
  const message = core.getInput('message');
  const ghToken = core.getInput('GITHUB_TOKEN');

  const context = github.context;
  if (context.payload.pull_request == null) {
    core.setFailed('No pull request found.');
    return;
  }
  const prNumber = context.payload.pull_request.number;

  const octokit = new Octokit({
    auth: ghToken
  });

  // Create a new Comment
  const c  = await octokit.issues.createComment({
    ...context.repo,
    issue_number: prNumber,
    body: message
  });

  console.log('comment', c);

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
