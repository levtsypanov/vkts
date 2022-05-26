workflow "CI/CD" {
  on = "push"
  resolves = ["VK Notify"]
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Build" {
  uses = "borales/actions-yarn@master"
  needs = ["Install"]
  args = "build"
}

action "Deploy" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Build"]
  env = {
    BRANCH = "gh-pages"
    FOLDER = "build"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "VK Notify" {
  uses = "alphamusic/VK-Notifications@master"
  needs = ["Deploy"]
  env = {
    VK_USERS = "310116789"
  }
  secrets = ["84951e6c2de868f34c194815ce490effd6513897671431e0ce0f9c4c78cbbd6ec638222ded9834a693e38"]
}
