const core = require('@actions/core');
const { context } = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');

console.log('c9aooo');

(async() => {
  try {
    const command = core.getInput('command');
    const ghToken = core.getInput('GITHUB_TOKEN');

    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
    }

    const results = execSync(command).toString();

    const octokit = new Octokit({
      auth: ghToken
    });

    // Create a new Comment
    const c  = await octokit.issues.createComment({
      ...context.repo,
      issue_number: context.payload.pull_request.number,
      body: results
    });
  } catch (error) {
    core.setFailed(error.message);
  }

})();