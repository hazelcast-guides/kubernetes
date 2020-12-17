FROM cpp-base-22 AS build

ARG VERSION=4.0-BETA

RUN wget https://github.com/hazelcast/hazelcast-cpp-client/releases/download/v${VERSION}/hazelcast-cpp-client-${VERSION}-Linux_64.zip
RUN unzip hazelcast-cpp-client-${VERSION}-Linux_64.zip
COPY . ./
RUN g++ Client.cpp -std=c++11 -o Client -lboost_thread -lboost_chrono -Ihazelcast/include -lpthread hazelcast/Linux_64/lib/libHazelcastClient4.0-BETA_64.a

FROM cpp-base-22

COPY --from=build ./Client .
ENV LD_LIBRARY_PATH /usr/local/lib

CMD ["./Client"]
