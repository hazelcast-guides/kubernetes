FROM python:3
ADD client.py /
RUN pip install -Iv hazelcast-python-client==4.0.0b1
CMD [ "python", "-u", "client.py" ]