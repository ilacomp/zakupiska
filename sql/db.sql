-- --------------------------------------------------------

--
-- Структура таблицы `lists`
--

DROP TABLE IF EXISTS `lists`;
CREATE TABLE IF NOT EXISTS `lists` (
  `id_list` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `color` varchar(7) NOT NULL DEFAULT '#ffffff',
  `dat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_list`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` VARCHAR(16),
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `users_username_uindex` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `user_lists`
--

DROP TABLE IF EXISTS `user_lists`;
CREATE TABLE IF NOT EXISTS `user_lists` (
  `id_user` int(11) NOT NULL,
  `id_list` int(11) NOT NULL,
  KEY `user_lists_lists_id_list_fk` (`id_list`),
  KEY `user_lists_users_id_user_fk` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `user_lists`
--
ALTER TABLE `user_lists`
  ADD CONSTRAINT `user_lists_ibfk_4` FOREIGN KEY (`id_list`) REFERENCES `lists` (`id_list`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_lists_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE items
(
  id_item INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_list INT(11) NOT NULL,
  title VARCHAR(200),
  amount VARCHAR(45),
  checked TINYINT(1) DEFAULT '0' NOT NULL,
  CONSTRAINT id_list_fk FOREIGN KEY (id_list) REFERENCES lists (id_list)
);
CREATE INDEX checked_idx ON items (checked);
CREATE INDEX id_list_idx ON items (id_list);