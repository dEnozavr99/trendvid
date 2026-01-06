FROM denoland/deno:2.4.4

# ffmpeg/ffprobe + python3 + venv (pip йде як залежність)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    python3 \
    python3-venv \
  && rm -rf /var/lib/apt/lists/*

# Create venv and install edge-tts inside it
RUN python3 -m venv /opt/venv \
  && /opt/venv/bin/pip install --upgrade pip \
  && /opt/venv/bin/pip install --no-cache-dir edge-tts

# Make edge-tts available in PATH
ENV PATH="/opt/venv/bin:${PATH}"

WORKDIR /app

COPY deno.json deno.lock* /app/
COPY src /app/src
RUN deno cache src/main.ts

# Copy rest (assets, etc.)
COPY . /app

ENTRYPOINT ["deno", "run", "-A", "src/main.ts"]
CMD ["--help"]