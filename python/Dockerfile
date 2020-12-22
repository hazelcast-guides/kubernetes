FROM python:3
ADD client.py /
# RUN pip install -Iv hazelcast-python-client==4.0.0b1
RUN git clone https://github.com/hazelcast/hazelcast-python-client && cd hazelcast-python-client && python setup.py install
CMD [ "python", "-u", "client.py" ]