FROM cpp-base

RUN wget https://github.com/hazelcast/hazelcast-cpp-client/releases/download/v4.0-BETA/hazelcast-cpp-client-4.0-BETA-Linux_64.zip
RUN unzip hazelcast-cpp-client-4.0-BETA-Linux_64.zip

COPY . ./

RUN g++ Client.cpp -std=c++11 -o Client -lboost_thread -lboost_chrono -Ihazelcast/include -lpthread hazelcast/Linux_64/lib/libHazelcastClient4.0-BETA_64.a

CMD ["./Client"]