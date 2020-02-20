FROM centos:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY supplierdiversity-0.0.1-SNAPSHOT.war /usr/src/app/

RUN yum install -y java

CMD ["java", "-jar", "/usr/src/app/supplierdiversity-0.0.1-SNAPSHOT.war"]
