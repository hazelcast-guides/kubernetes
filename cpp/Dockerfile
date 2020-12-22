FROM fedora:22

ARG VERSION=4.0-BETA

RUN dnf install -y gcc-c++ tar wget bzip2 unzip
# install boost
RUN wget https://dl.bintray.com/boostorg/release/1.75.0/source/boost_1_75_0.tar.bz2 && tar xjf boost_1_75_0.tar.bz2 && rm boost_1_75_0.tar.bz2 && cd boost_1_75_0 && ./bootstrap.sh && ./b2 address-model=64 --with-thread --with-chrono install && cd .. && rm -rf boost_1_75_0
# install hazelcast cpp client
RUN wget https://github.com/hazelcast/hazelcast-cpp-client/releases/download/v${VERSION}/hazelcast-cpp-client-${VERSION}-Linux_64.zip && unzip hazelcast-cpp-client-${VERSION}-Linux_64.zip && rm hazelcast-cpp-client-${VERSION}-Linux_64.zip

# build client application
COPY . .
COPY hazelcast/Linux_64/lib/libHazelcastClient4.0-SNAPSHOT_64.so /usr/local/lib
RUN g++ Client.cpp -std=c++11 -o Client -lboost_thread -lboost_chrono -Ihazelcast/include -lpthread hazelcast/Linux_64/lib/libHazelcastClient4.0-SNAPSHOT_64.so

# clean up
RUN rm -r hazelcast Client.cpp
RUN dnf remove -y gcc-c++ tar wget bzip2 unzip

ENV LD_LIBRARY_PATH /usr/local/lib

CMD ["./Client"]
