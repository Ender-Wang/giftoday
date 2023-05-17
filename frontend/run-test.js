const { Octokit } = require("@octokit/rest");

async function runTests() {
  const octokit = new Octokit();

  
  const pullRequestNumber = process.env.PR_NUMBER;

  // Fetch the pull request details
  const { data: pullRequest } = await octokit.pulls.get({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    pull_number: pullRequestNumber,
  });

  // Get the latest commit on the master branch
  const { data: masterBranch } = await octokit.repos.getBranch({
    owner: process.env.REPO_OWNER,
    repo: process.env.REPO_NAME,
    branch: "master",
  });

  // Compare the commit SHAs to determine if the pull request is not behind the master branch
  const isUpdated = pullRequest.base.sha === masterBranch.commit.sha;

  if (isUpdated) {
    console.log(
      "Pull request is not behind the master branch. Running tests..."
    );
    // Run your tests here
  } else {
    console.log("Pull request is behind the master branch. Skipping tests.");
  }
}

runTests();
