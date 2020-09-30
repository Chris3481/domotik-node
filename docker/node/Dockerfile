# @see https://github.com/mozilla-iot/wiki/wiki/Installing-OpenZWave

FROM balenalib/raspberry-pi-debian

# Install utilities
RUN install_packages \
    software-properties-common \
    build-essential \
    libudev-dev \
    pkg-config \
    curl \
    npm \
    git

# Install last version of nodeJs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN install_packages nodejs

# Install OpenZWave
RUN git clone "https://github.com/OpenZWave/open-zwave.git"

RUN cd open-zwave && make && make install

# Add library to ARM library
RUN cp /usr/local/lib/libopen* /usr/lib/arm-linux-gnueabihf

