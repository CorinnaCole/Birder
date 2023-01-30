-- DROP DATABASE IF EXISTS birder;

CREATE DATABASE birder;

CREATE TABLE
  users (
    user_id serial NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    profile_url text NULL,
    user_location integer NULL
  );

ALTER TABLE
  users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (user_id);

CREATE TABLE
  message (
    message_id serial NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp
    with
      time zone NOT NULL,
      sender_id integer NOT NULL,
      conversation_id integer NOT NULL
  );

ALTER TABLE
  message
ADD
  CONSTRAINT message_pkey PRIMARY KEY (message_id);

CREATE TABLE
  friendships (
    friendship_id serial NOT NULL,
    logged_in_user_id integer NOT NULL,
    friend_user_id integer NOT NULL
  );

ALTER TABLE
  friendships
ADD
  CONSTRAINT "Friendships_pkey" PRIMARY KEY (friendship_id);

CREATE TABLE
  conversations (conv_id serial NOT NULL);

ALTER TABLE
  conversations
ADD
  CONSTRAINT conversations_pkey PRIMARY KEY (conv_id);

CREATE TABLE
  birds (
    bird_id serial NOT NULL,
    bird_common_name text NOT NULL,
    scentific_name text NULL,
    summary character varying NULL
  );

ALTER TABLE
  birds
ADD
  CONSTRAINT birds_pkey PRIMARY KEY (bird_id);

ALTER TABLE
  birds
ADD
  CONSTRAINT unique_sci_name UNIQUE (scentific_name);

CREATE TABLE
  bird_user (
    b_u_id serial NOT NULL,
    bird_id integer NOT NULL,
    user_id integer NOT NULL
  );

ALTER TABLE
  bird_user
ADD
  CONSTRAINT bird_user_pkey PRIMARY KEY (b_u_id);

ALTER TABLE IF EXISTS bird_user
    ADD CONSTRAINT unique_bird_id_user_id UNIQUE (bird_id, user_id);

CREATE TABLE
  bird_photos (
    photo_id serial NOT NULL,
    photo_url text NULL,
    location_lat double precision NULL,
    location_lon double precision NULL,
    date timestamp
    with
      time zone NOT NULL,
      bird_user_id integer NOT NULL,
      note text NULL,
      bird_id integer NOT NULL
  );

ALTER TABLE
  bird_photos
ADD
  CONSTRAINT bird_photos_pkey PRIMARY KEY (photo_id);







