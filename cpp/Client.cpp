#define BOOST_THREAD_VERSION 5

#include <iostream>
#include <hazelcast/client/hazelcast_client.h>

int main() {
    hazelcast::client::hazelcast_client hz; // Connects to the cluster
    std::cout << "Started the Hazelcast C++ client instance " << hz.get_name() << std::endl; // Prints client instance name
    return 0;
}