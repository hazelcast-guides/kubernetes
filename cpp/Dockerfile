FROM fedora:22

ARG VERSION=4.0.0

RUN dnf groups install -y "Development Tools"
RUN dnf install -y gcc-c++ tar wget bzip2 unzip cmake which

RUN wget --quiet https://github.com/Kitware/CMake/releases/download/v3.19.0/cmake-3.19.0-Linux-x86_64.sh && \
    chmod +x ./cmake-3.19.0-Linux-x86_64.sh && \
    ./cmake-3.19.0-Linux-x86_64.sh --prefix=/usr/local/ --exclude-subdir && \
    rm cmake-3.19.0-Linux-x86_64.sh

# install boost
RUN wget --quiet https://dl.bintray.com/boostorg/release/1.75.0/source/boost_1_75_0.tar.bz2 && tar xjf boost_1_75_0.tar.bz2 && rm boost_1_75_0.tar.bz2 && cd boost_1_75_0 && ./bootstrap.sh && ./b2 address-model=64 --with-thread --with-chrono install && cd .. && rm -rf boost_1_75_0

# install hazelcast cpp client
RUN wget --quiet https://github.com/hazelcast/hazelcast-cpp-client/archive/v4.0.0.zip && unzip v4.0.0.zip && rm v4.0.0.zip && cd hazelcast-cpp-client-4.0.0 && cmake -S . -B build && cmake --build build --verbose && cmake --install build && cd .. && rm -rf hazelcast-cpp-client-4.0.0

# build client application
COPY . .
RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release && cmake --build build --verbose && cp build/cpp_client .

ENV LD_LIBRARY_PATH /usr/local/lib

CMD ["./cpp_client"]