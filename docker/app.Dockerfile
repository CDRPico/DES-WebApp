# Stage 1: Building the application
FROM python:3.11.6 as base

    # python
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    \
    # pip
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    \
    # paths
    # this is where our requirements + virtual environment will live
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

WORKDIR /app

# Copy only the necessary files for the build
COPY pyproject.toml poetry.lock ./

RUN apt-get clean

# Install OS package dependencies
RUN apt-get update && \
    apt-get install -qq -y --allow-unauthenticated --no-install-recommends  \
    build-essential  \
    libpq-dev  \
    libffi-dev  \
    openssl  \
    libssl-dev  \
    libxml2-dev  \
    libxslt1-dev  \
    zlib1g-dev  \
    binutils  \
    libproj-dev  \
    gdal-bin  \
    libgdal-dev  \
    postgis && \
    rm -rf /var/lib/apt/lists/* .venv

RUN pip install -U pip setuptools poetry==1.5.1
RUN poetry config virtualenvs.in-project true

# Install Python dependencies
RUN poetry install --no-root

# Stage 2: Creating the final image
FROM base as app

WORKDIR /app
# Copy the rest of the application code
COPY . ./

# Copy only the necessary files from the builder stage
COPY --from=base /app /app

ENV PORT=8000
EXPOSE 8000
