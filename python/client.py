import hazelcast
import logging
import random
import time
import traceback

if __name__ == "__main__":
    logging.basicConfig()
    logging.getLogger().setLevel(logging.INFO)

    client = hazelcast.HazelcastClient(
        cluster_members=["hz-hazelcast"]
    )

    my_map = client.get_map("map").blocking()
    my_map.put("key", "value")

    if my_map.get("key") == "value":
        print("Successful connection!")
        print("Starting to fill the map with random entries.");
        while True:
            random_key = random.randint(1, 100000)
            try:
                my_map.put("key" + str(random_key), "value" + str(random_key))
            except Exception as err:
                traceback.print_tb(err.__traceback__)

            if random_key % 100 == 0:
                print("Current map size: " + str(my_map.size()))
                time.sleep(1)

    else:
        raise Exception("Connection failed, check your configuration.")

    client.shutdown()
