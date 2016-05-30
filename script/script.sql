CREATE TABLE fincentry
(
  fincentry_id character varying(36) NOT NULL,
  description character varying(255),
  amount numeric,
  currency character(3),
  date timestamp without time zone,
  CONSTRAINT fincentry_fk PRIMARY KEY (fincentry_id)
)
WITH (
  OIDS=FALSE
);


INSERT INTO fincentry (fincentry_id, description, amount, currency, date) VALUES ('test0', 'test description 0', 100, 'EUR', '2016-05-25 01:14:01.952298');
INSERT INTO fincentry (fincentry_id, description, amount, currency, date) VALUES ('test1', 'test description 1', 200, 'EUR', '2016-05-25 01:20:01.952298');