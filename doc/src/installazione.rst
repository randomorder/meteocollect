*************
Installazione
*************

Meteocollect mira ad essere molto semplice ma prima di poterlo installare
bisogna assicurarsi che le sue dipendenze siano soddisfatte.


Dipendenze
==========

Meteocollect è un'applicazione completamente scritta in *JavaScript* e sfrutta
*Node.js* come engine. Inoltre, è distribuito come pacchetto *npm* e, in quanto
tale, utilizza la stessa tecnologia per la gestione delle dipendenze, per
l'avvio e la terminazione dell'applicazione.

Se nel proprio sistema sono già installati *Node.js* e *npm*, si può passare
alla sezione successiva, altrimenti di seguito, si possono trovare le istruzione
per ottenere il necessario.


Node.js
-------

È possibile scaricare l'ultima versione di *Node.js* dal sito ufficiale
cliccando `qui`_ . Oppure tramite line di comando:

.. _qui: https://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz
::

    wget https://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz

Una volta scaricato il pacchetto, estraetelo e installatelo sulla macchina con:

::

    tar -xf node-v0.12.7.tar.gz
    cd node-v0.12.7
    ./configure
    make
    sudo make install

.. important:: per compilare *Node.js* da sorgenti è necessari che sulla
   macchina sia installato *Python 2.6* o *Python 2.7*.

Terminata l'installazione è possibile controllare che tutto sia andato a buon
fine provando i comandi:
::

    node --version
e

::

    npm --version


Sphinx
------

Questa dipendenza è relativa soltanto alla documentazione ed è *opzionale*. La
documentazione di Meteocollect è scritta in *reStructuredText* ed possibile
utilizzare *Sphinx* per ottenere un documento *HTML* molto più gradevole.

Per installare *Sphinx* e possibile utilizzare il gestore dei pacchetti di
python, *pip*.

Per installare pip:
::

    sudo apt-get install python-pip

Per installare sphinx:
::

    sudo pip install sphinx

Una volta istallato node.js, npm e sphinx è possibile compilare la
documentazione con il comando:
::

    npm run-script docs

Il comando apre automaticamente la documentazione compilata nel browser di
default. Se ciò non dovesse accadere aprire manualmente il file
``doc/html/index.html`` con un web browser.


Configurazione e Avvio
======================

Prima di avviare il server diamo uno sguardo alle configurazioni possibili.


Configurazione
--------------

All'interno del file ``bin/configs.js`` è possibile settare:

**port**
    numero di porta sulla quale il server si mette in ascolto.
    :Nota:: per utilizzare valori minori di 1000 è necessario avviare il
            server con i permessi di *root*.

**date-format**
    stringa di formato usata per definire il formato di stampa della data
    nei messaggi di log. Di seguito i valori possibili:

    +----------------------+---------+----------------------------------------+
    |                      |  Token  | Output                                 |
    +======================+=========+========================================+
    | Month                | M       | 1 2 ... 11 12                          |
    |                      +---------+----------------------------------------+
    |                      | Mo      | 1st 2nd ... 11th 12th                  |
    |                      +---------+----------------------------------------+
    |                      | MM      | 01 02 ... 11 12                        |
    |                      +---------+----------------------------------------+
    |                      | MMM     | Jan Feb ... Nov Dec                    |
    |                      +---------+----------------------------------------+
    |                      | MMMM    | January February ... November December |
    +----------------------+---------+----------------------------------------+
    | Quarter              | Q       | 1 2 3 4                                |
    +----------------------+---------+----------------------------------------+
    | Day of Month         | D       | 1 2 ... 30 31                          |
    |                      +---------+----------------------------------------+
    |                      | Do      | 1st 2nd ... 30th 31st                  |
    |                      +---------+----------------------------------------+
    |                      | DD      | 01 02 ... 30 31                        |
    +----------------------+---------+----------------------------------------+
    | Day of Year          | DDD     | 1 2 ... 364 365                        |
    |                      +---------+----------------------------------------+
    |                      | DDDo    | 1st 2nd ... 364th 365th                |
    |                      +---------+----------------------------------------+
    |                      | DDDD    | 001 002 ... 364 365                    |
    +----------------------+---------+----------------------------------------+
    | Day of Week          | d       | 0 1 ... 5 6                            |
    |                      +---------+----------------------------------------+
    |                      | do      | 0th 1st ... 5th 6th                    |
    |                      +---------+----------------------------------------+
    |                      | dd      | Su Mo ... Fr Sa                        |
    |                      +---------+----------------------------------------+
    |                      | ddd     | Sun Mon ... Fri Sat                    |
    |                      +---------+----------------------------------------+
    |                      | dddd    | Sunday Monday ... Friday Saturday      |
    +----------------------+---------+----------------------------------------+
    | Day of Week (Locale) | e       | 0 1 ... 5 6                            |
    +----------------------+---------+----------------------------------------+
    | Day of Week (ISO)    | E       | 1 2 ... 6 7                            |
    +----------------------+---------+----------------------------------------+
    | Week of Year         | w       | 1 2 ... 52 53                          |
    |                      +---------+----------------------------------------+
    |                      | wo      | 1st 2nd ... 52nd 53rd                  |
    |                      +---------+----------------------------------------+
    |                      | ww      | 01 02 ... 52 53                        |
    +----------------------+---------+----------------------------------------+
    | Week of Year (ISO)   | W       | 1 2 ... 52 53                          |
    |                      +---------+----------------------------------------+
    |                      | Wo      | 1st 2nd ... 52nd 53rd                  |
    |                      +---------+----------------------------------------+
    |                      | WW      | 01 02 ... 52 53                        |
    |                      +---------+----------------------------------------+
    |                      | Year    | YY  70 71 ... 29 30                    |
    |                      +---------+----------------------------------------+
    |                      | YYYY    | 1970 1971 ... 2029 2030                |
    +----------------------+---------+----------------------------------------+
    | Week Year            | gg      | 70 71 ... 29 30                        |
    |                      +---------+----------------------------------------+
    |                      | gggg    | 1970 1971 ... 2029 2030                |
    +----------------------+---------+----------------------------------------+
    | Week Year (ISO)      | GG      | 70 71 ... 29 30                        |
    |                      +---------+----------------------------------------+
    |                      | GGGG    | 1970 1971 ... 2029 2030                |
    +----------------------+---------+----------------------------------------+
    | AM/PM                | A       | AM PM                                  |
    |                      +---------+----------------------------------------+
    |                      | a       | am pm                                  |
    +----------------------+---------+----------------------------------------+
    | Hour                 | H       | 0 1 ... 22 23                          |
    |                      +---------+----------------------------------------+
    |                      | HH      | 00 01 ... 22 23                        |
    |                      +---------+----------------------------------------+
    |                      | h       | 1 2 ... 11 12                          |
    |                      +---------+----------------------------------------+
    |                      | hh      | 01 02 ... 11 12                        |
    +----------------------+---------+----------------------------------------+
    | Minute               | m       | 0 1 ... 58 59                          |
    |                      +---------+----------------------------------------+
    |                      | mm      | 00 01 ... 58 59                        |
    +----------------------+---------+----------------------------------------+
    | Second               | s       | 0 1 ... 58 59                          |
    |                      +---------+----------------------------------------+
    |                      | ss      | 00 01 ... 58 59                        |
    +----------------------+---------+----------------------------------------+
    | Fractional Second    | S       | 0 1 ... 8 9                            |
    |                      +---------+----------------------------------------+
    |                      | SS      | 00 01 ... 98 99                        |
    |                      +---------+----------------------------------------+
    |                      | SSS     | 000 001 ... 998 999                    |
    +----------------------+---------+----------------------------------------+
    | Timezone             | z or zz | EST CST ... MST PST                    |
    |                      +---------+----------------------------------------+
    |                      | Z       | -07:00 -06:00 ... +06:00 +07:00        |
    |                      +---------+----------------------------------------+
    |                      | ZZ      | -0700 -0600 ... +0600 +0700            |
    +----------------------+---------+----------------------------------------+
    | Unix Timestamp       | X       | 1360013296                             |
    +----------------------+---------+----------------------------------------+
    | Unix Millisecond     | x       | 1360013296123                          |
    | Timestamp            |         |                                        |
    +----------------------+---------+----------------------------------------+
    :Nota: per maggiori dettagli vedere la documentazione di `moment.js`_.

    .. _moment.js: http://momentjs.com/docs/#/displaying/format/

    **loggers**
        qui è possibile specificare un numero arbitrario di configurazioni per
        vari loggers *winston*. Ogniuna delle quali può definire due tipi di
        output diversi:

        *console*
            Definisce le impostazioni per il logging su console.

            +----------------+-----------+-------------+
            | Configurazione | Valori    | Descrizione |
            +----------------+-----------+-------------+
            | ``level``      | "silly"   | imposta il  |
            |                | "debug"   | livello di  |
            |                | "verbose" | log.        |
            |                | "info"    |             |
            |                | "warn"    |             |
            |                | "error"   |             |
            +----------------+-----------+-------------+
            | ``colorize``   | true      | attiva      |
            |                | false     | l'output    |
            |                |           | colorato    |
            +----------------+-----------+-------------+

        *file*
            +----------------+-------------------+-----------------+
            | Configurazione | Valori            | Descrizione     |
            +----------------+-------------------+-----------------+
            | ``timestamp``  | true, false       |                 |
            +----------------+-------------------+-----------------+
            | ``json``       | true, false       |                 |
            +----------------+-------------------+-----------------+
            | ``filename``   |                   |                 |
            +----------------+-------------------+-----------------+
            | ``maxfiles``   | 1 2 3 ...         |                 |
            +----------------+-------------------+-----------------+
            | ``maxsize``    |                   |                 |
            +----------------+-------------------+-----------------+
            | ``level``      | "silly", "debug", | livello di log  |
            |                | "verbose", "info" |                 |
            |                | "warn", "error"   |                 |
            +----------------+-------------------+-----------------+
        :Nota: per maggiori dettagli vedi la documentazione di `winston-config`_.

        .. _winston-config: https://www.npmjs.com/package/winston-config
