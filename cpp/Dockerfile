FROM fedora:22

ARG VERSION=4.0.0

RUN dnf install -y gcc-c++ tar wget bzip2 unzip cmake
# install boost
RUN wget https://dl.bintray.com/boostorg/release/1.75.0/source/boost_1_75_0.tar.bz2 && tar xjf boost_1_75_0.tar.bz2 && rm boost_1_75_0.tar.bz2 && cd boost_1_75_0 && ./bootstrap.sh && ./b2 address-model=64 --with-thread --with-chrono install && cd .. && rm -rf boost_1_75_0
# install hazelcast cpp client
RUN wget https://github.com/hazelcast/hazelcast-cpp-client/archive/v4.0.0.zip && unzip v4.0.0.zip && rm v4.0.0.zip && cd hazelcast-cpp-client-4.0.0 && cmake -S . -B build && cmake --build build --verbose --parallel && cmake --install build && cd - && rm -rf hazelcast-cpp-client-4.0.0

# build client application
RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH=/Users/ihsan/Desktop/boost_72;hazelcast-cpp-client-4.0.0/my_install && cmake --build build --verbose && cp build/cpp_client .

ENV LD_LIBRARY_PATH /usr/local/lib

CMD ["./cpp_client"]