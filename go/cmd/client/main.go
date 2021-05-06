package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/hazelcast/hazelcast-go-client"
)

func main() {
	cb := hazelcast.NewConfigBuilder()
	cb.Cluster().SetAddrs("hz-hazelcast:5701")
	client, err := hazelcast.StartNewClientWithConfig(cb)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Successful connection!")
	log.Println("Starting to fill the map with random entries.")
	m, err := client.GetMap("map")
	if err != nil {
		log.Fatal(err)
	}
	for {
		num := rand.Intn(100_000)
		key := fmt.Sprintf("key-%d", num)
		value := fmt.Sprintf("value-%d", num)
		if _, err = m.Put(key, value); err != nil {
			log.Println("ERR:", err.Error())
		} else {
			if num % 100 == 0 {
				if mapSize, err := m.Size(); err != nil {
					log.Println("ERR:", err.Error())
				} else {
					log.Println("Current map size:", mapSize)
					time.Sleep(1 * time.Second)
				}
			}
		}
	}
}
