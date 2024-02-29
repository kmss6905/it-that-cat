pipeline {
    agent any
    stages {
        stage('FE - Change display build name') {
            steps {
              script {
                currentBuild.displayName = "#${BUILD_NUMBER} | FE | branch = ${BRANCH_NAME}"
              }
            }
        }

        stage('FE - Set Development Environments Variables From AWS Parameter Store'){
          when {
            branch 'dev'
          }
          steps {
              script {
                  // set env param
                  env.TARGET_HOST=sh(script: "aws ssm get-parameter --name /dev/front/ssh/targethost --query 'Parameter.Value' --output text", returnStdout: true).trim()
                  env.ECR_REPOSITORY=sh(script: "aws ssm get-parameter --name /dev/front/ecr --query 'Parameter.Value' --output text", returnStdout: true).trim()
                  env.DOCKER_IMAGE=sh(script: "aws ssm get-parameter --name /dev/front/image-name --query 'Parameter.Value' --output text", returnStdout: true).trim()

                  // get .env string
                  sh "aws ssm get-parameter --name /dev/front --query 'Parameter.Value' --output text > .env"

                  echo "${TARGET_HOST}, ${ECR_REPOSITORY}, ${DOCKER_IMAGE}"
              }
          }
        }

        stage('FE - Docker Build Image') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    def image = docker.build("${env.DOCKER_IMAGE}", "-f dev.Dockerfile ./docker")
                    env.DOCKER_IMAGE_ID = image.id
                }
            }
        }

        stage('FE - Docker Push Image to ECR Dev') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    def image = docker.image("${env.DOCKER_IMAGE_ID}")
                    docker.withRegistry("https://${env.ECR_REPOSITORY}", "ecr:ap-northeast-2:potenday-ecr-credentials") {
                        image.push("${env.BUILD_NUMBER}")
                        image.push("latest")
                    }
                }
            }
        }

        stage("FE - Deploy in Dev") {
            agent any
            when {
                branch 'dev'
            }
            steps {
                sshagent(credentials: ['jenkins-deploy-dev-server-credentials']) {
                    sh 'ssh -o StrictHostKeyChecking=no ${TARGET_HOST} '
                    sh "ssh ${TARGET_HOST} 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${ECR_REPOSITORY}'"
                    sh "ssh ${TARGET_HOST} 'docker compose pull && docker compose up -d'"
                }
            }
        }
    }
}