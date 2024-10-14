"use client";
import { vars } from "nativewind";

export const config = {
  light: vars({
    "--color-primary-0": "255 234 212",
    "--color-primary-50": "255 215 179",
    "--color-primary-100": "255 191 140",
    "--color-primary-200": "255 156 84",
    "--color-primary-300": "255 117 28",
    "--color-primary-400": "255 103 0",
    "--color-primary-500": "230 98 0",
    "--color-primary-600": "180 76 0",
    "--color-primary-700": "130 54 0",
    "--color-primary-800": "81 33 0",
    "--color-primary-900": "56 22 0",
    "--color-primary-950": "17 7 0",

    /* Secondary  */
    "--color-secondary-0": "252 252 252",
    "--color-secondary-50": "240 240 240",
    "--color-secondary-100": "230 230 230",
    "--color-secondary-200": "210 210 210",
    "--color-secondary-300": "190 190 190",
    "--color-secondary-400": "170 170 170",
    "--color-secondary-500": "150 150 150",
    "--color-secondary-600": "130 130 130",
    "--color-secondary-700": "110 110 110",
    "--color-secondary-800": "90 90 90",
    "--color-secondary-900": "70 70 70",
    "--color-secondary-950": "50 50 50",

    /* Tertiary */
    "--color-tertiary-0": "222 240 255",
    "--color-tertiary-50": "222 240 255",
    "--color-tertiary-100": "175 207 255",
    "--color-tertiary-200": "125 175 255",
    "--color-tertiary-300": "75 143 255",
    "--color-tertiary-400": "26 111 255",
    "--color-tertiary-500": "0 86 230",
    "--color-tertiary-600": "0 67 180",
    "--color-tertiary-700": "0 48 130",
    "--color-tertiary-800": "0 29 81",
    "--color-tertiary-900": "0 10 33",
    "--color-tertiary-950": "0 10 33",

    /* Error */
    "--color-error-0": "83 19 19",

    "--color-error-50": "254 226 226",
    "--color-error-100": "254 202 202",
    "--color-error-200": "252 165 165",
    "--color-error-300": "248 113 113",
    "--color-error-400": "239 68 68",
    "--color-error-500": "230 53 53",
    "--color-error-600": "220 38 38",
    "--color-error-700": "185 28 28",
    "--color-error-800": "127 29 29",
    "--color-error-900": "153 27 27",
    "--color-error-950": "34 8 8",

    /* Success */
    "--color-success-0": "228 255 244",

    "--color-success-50": "202 255 232",
    "--color-success-100": "162 241 192",
    "--color-success-200": "132 211 162",
    "--color-success-300": "102 181 132",
    "--color-success-400": "72 151 102",
    "--color-success-500": "52 131 82",
    "--color-success-600": "42 121 72",
    "--color-success-700": "32 111 62",
    "--color-success-800": "22 101 52",
    "--color-success-900": "20 83 45",
    "--color-success-950": "7 31 17",

    /* Warning */
    "--color-warning-0": "84 45 18",

    "--color-warning-50": "255 247 237",
    "--color-warning-100": "255 237 213",
    "--color-warning-200": "254 215 170",
    "--color-warning-300": "253 186 116",
    "--color-warning-400": "251 146 60",
    "--color-warning-500": "249 115 22",
    "--color-warning-600": "234 88 12",
    "--color-warning-700": "194 65 12",
    "--color-warning-800": "154 52 18",
    "--color-warning-900": "124 45 18",
    "--color-warning-950": "255 253 251",

    /* Info */
    "--color-info-0": "3 38 56",

    "--color-info-50": "240 249 255",
    "--color-info-100": "224 242 254",
    "--color-info-200": "186 230 253",
    "--color-info-300": "125 211 252",
    "--color-info-400": "56 189 248",
    "--color-info-500": "14 165 233",
    "--color-info-600": "2 132 199",
    "--color-info-700": "3 105 161",
    "--color-info-800": "7 89 133",
    "--color-info-900": "12 74 110",
    "--color-info-950": "236 248 254",

    "--color-typography-0": "204 204 204", // light gray
    "--color-typography-50": "217 217 217", // light gray
    "--color-typography-100": "235 235 235", // very light gray
    "--color-typography-200": "245 245 245", // very light gray
    "--color-typography-300": "115 115 115", // medium gray
    "--color-typography-400": "140 140 140", // medium gray
    "--color-typography-500": "163 163 163", // medium gray
    "--color-typography-600": "189 189 189", // light gray
    "--color-typography-700": "23 23 23", // dark gray
    "--color-typography-800": "38 38 39", // dark gray
    "--color-typography-900": "64 64 64", // dark gray
    "--color-typography-950": "82 82 82", // dark gray

    /* Outline */
    "--color-outline-0": "26 23 23",

    "--color-outline-50": "39 38 36",
    "--color-outline-100": "65 65 65",
    "--color-outline-200": "83 82 82",
    "--color-outline-300": "115 116 116",
    "--color-outline-400": "140 141 141",
    "--color-outline-500": "165 163 163",
    "--color-outline-600": "211 211 211",
    "--color-outline-700": "221 220 219",
    "--color-outline-800": "230 230 230",
    "--color-outline-900": "243 243 243",
    "--color-outline-950": "253 254 254",

    /* Background */
    "--color-background-0": "18 18 18",

    "--color-background-50": "39 38 37",
    "--color-background-100": "65 64 64",
    "--color-background-200": "83 82 82",
    "--color-background-300": "116 116 116",
    "--color-background-400": "142 142 142",
    "--color-background-500": "162 163 163",
    "--color-background-600": "213 212 212",
    "--color-background-700": "220 219 219",
    "--color-background-800": "242 241 241",
    "--color-background-900": "246 246 246",
    "--color-background-950": "254 254 254",

    /* Background Special */
    "--color-background-error": "66 43 43",

    "--color-background-warning": "65 47 35",
    "--color-background-success": "28 43 33",
    "--color-background-muted": "51 51 51",
    "--color-background-info": "26 40 46",

    /* Focus Ring Indicator  */
    "--color-indicator-primary": "247 247 247",

    "--color-indicator-info": "161 199 245",
    "--color-indicator-error": "232 70 69",
    "--color-rose-50": "255 241 242",
    "--color-rose-100": "255 228 230",
    "--color-rose-200": "254 205 211",
    "--color-rose-300": "253 164 175",
    "--color-rose-400": "251 113 133",
    "--color-rose-500": "244 63 94",
    "--color-rose-600": "225 29 72",
    "--color-rose-700": "190 18 60",
    "--color-rose-800": "159 18 57",
    "--color-rose-900": "136 19 55",
    "--color-pink-50": "253 242 248",
    "--color-pink-100": "252 231 243",
    "--color-pink-200": "251 207 232",
    "--color-pink-300": "249 168 212",
    "--color-pink-400": "244 114 182",
    "--color-pink-500": "236 72 153",
    "--color-pink-600": "219 39 119",
    "--color-pink-700": "190 24 93",
    "--color-pink-800": "157 23 77",
    "--color-pink-900": "131 24 67",
    "--color-fuchsia-50": "253 244 255",
    "--color-fuchsia-100": "250 232 255",
    "--color-fuchsia-200": "245 208 254",
    "--color-fuchsia-300": "240 171 252",
    "--color-fuchsia-400": "232 121 249",
    "--color-fuchsia-500": "217 70 239",
    "--color-fuchsia-600": "192 38 211",
    "--color-fuchsia-700": "162 28 175",
    "--color-fuchsia-800": "134 25 143",
    "--color-fuchsia-900": "112 26 117",
    "--color-purple-50": "250 245 255",
    "--color-purple-100": "243 232 255",
    "--color-purple-200": "233 213 255",
    "--color-purple-300": "216 180 254",
    "--color-purple-400": "192 132 252",
    "--color-purple-500": "168 85 247",
    "--color-purple-600": "147 51 234",
    "--color-purple-700": "126 34 206",
    "--color-purple-800": "107 33 168",
    "--color-purple-900": "88 28 135",
    "--color-violet-50": "245 243 255",
    "--color-violet-100": "237 233 254",
    "--color-violet-200": "221 214 254",
    "--color-violet-300": "196 181 253",
    "--color-violet-400": "167 139 250",
    "--color-violet-500": "139 92 246",
    "--color-violet-600": "124 58 237",
    "--color-violet-700": "109 40 217",
    "--color-violet-800": "91 33 182",
    "--color-violet-900": "76 29 149",
    "--color-indigo-50": "238 242 255",
    "--color-indigo-100": "224 231 255",
    "--color-indigo-200": "199 210 254",
    "--color-indigo-300": "165 180 252",
    "--color-indigo-400": "129 140 248",
    "--color-indigo-500": "99 102 241",
    "--color-indigo-600": "79 70 229",
    "--color-indigo-700": "67 56 202",
    "--color-indigo-800": "55 48 163",
    "--color-indigo-900": "49 46 129",
    "--color-blue-50": "239 246 255",
    "--color-blue-100": "219 234 254",
    "--color-blue-200": "191 219 254",
    "--color-blue-300": "147 197 253",
    "--color-blue-400": "96 165 250",
    "--color-blue-500": "59 130 246",
    "--color-blue-600": "37 99 235",
    "--color-blue-700": "29 78 216",
    "--color-blue-800": "30 64 175",
    "--color-blue-900": "30 58 138",
    "--color-lightBlue-50": "240 249 255",
    "--color-lightBlue-100": "224 242 254",
    "--color-lightBlue-200": "186 230 253",
    "--color-lightBlue-300": "125 211 252",
    "--color-lightBlue-400": "56 189 248",
    "--color-lightBlue-500": "14 165 233",
    "--color-lightBlue-600": "2 132 199",
    "--color-lightBlue-700": "3 105 161",
    "--color-lightBlue-800": "7 89 133",
    "--color-lightBlue-900": "12 74 110",
    "--color-darkBlue-50": "219 244 255",
    "--color-darkBlue-100": "173 219 255",
    "--color-darkBlue-200": "124 194 255",
    "--color-darkBlue-300": "74 169 255",
    "--color-darkBlue-400": "26 145 255",
    "--color-darkBlue-500": "0 119 230",
    "--color-darkBlue-600": "0 93 180",
    "--color-darkBlue-700": "0 66 130",
    "--color-darkBlue-800": "0 40 81",
    "--color-darkBlue-900": "0 14 33",
    "--color-cyan-50": "236 254 255",
    "--color-cyan-100": "207 250 254",
    "--color-cyan-200": "165 243 252",
    "--color-cyan-300": "103 232 249",
    "--color-cyan-400": "34 211 238",
    "--color-cyan-500": "6 182 212",
    "--color-cyan-600": "8 145 178",
    "--color-cyan-700": "14 116 144",
    "--color-cyan-800": "21 94 117",
    "--color-cyan-900": "22 78 99",
    "--color-teal-50": "240 253 250",
    "--color-teal-100": "204 251 241",
    "--color-teal-200": "153 246 228",
    "--color-teal-300": "94 234 212",
    "--color-teal-400": "45 212 191",
    "--color-teal-500": "20 184 166",
    "--color-teal-600": "13 148 136",
    "--color-teal-700": "15 118 110",
    "--color-teal-800": "17 94 89",
    "--color-teal-900": "19 78 74",
    "--color-emerald-50": "236 253 245",
    "--color-emerald-100": "209 250 229",
    "--color-emerald-200": "167 243 208",
    "--color-emerald-300": "110 231 183",
    "--color-emerald-400": "52 211 153",
    "--color-emerald-500": "16 185 129",
    "--color-emerald-600": "5 150 105",
    "--color-emerald-700": "4 120 87",
    "--color-emerald-800": "6 95 70",
    "--color-emerald-900": "6 78 59",
    "--color-green-50": "240 253 244",
    "--color-green-100": "220 252 231",
    "--color-green-200": "187 247 208",
    "--color-green-300": "134 239 172",
    "--color-green-400": "74 222 128",
    "--color-green-500": "34 197 94",
    "--color-green-600": "22 163 74",
    "--color-green-700": "21 128 61",
    "--color-green-800": "22 101 52",
    "--color-green-900": "20 83 45",
    "--color-lime-50": "247 254 231",
    "--color-lime-100": "236 252 203",
    "--color-lime-200": "217 249 157",
    "--color-lime-300": "190 242 100",
    "--color-lime-400": "163 230 53",
    "--color-lime-500": "132 204 22",
    "--color-lime-600": "101 163 13",
    "--color-lime-700": "77 124 15",
    "--color-lime-800": "63 98 18",
    "--color-lime-900": "54 83 20",
    "--color-yellow-50": "254 252 232",
    "--color-yellow-100": "254 249 195",
    "--color-yellow-200": "254 240 138",
    "--color-yellow-300": "253 224 71",
    "--color-yellow-400": "250 204 21",
    "--color-yellow-500": "234 179 8",
    "--color-yellow-600": "202 138 4",
    "--color-yellow-700": "161 98 7",
    "--color-yellow-800": "133 77 14",
    "--color-yellow-900": "113 63 18",
    "--color-amber-50": "255 251 235",
    "--color-amber-100": "254 243 199",
    "--color-amber-200": "253 230 138",
    "--color-amber-300": "252 211 77",
    "--color-amber-400": "251 191 36",
    "--color-amber-500": "245 158 11",
    "--color-amber-600": "217 119 6",
    "--color-amber-700": "180 83 9",
    "--color-amber-800": "146 64 14",
    "--color-amber-900": "120 53 15",
    "--color-orange-50": "255 247 237",
    "--color-orange-100": "255 237 213",
    "--color-orange-200": "254 215 170",
    "--color-orange-300": "253 186 116",
    "--color-orange-400": "251 146 60",
    "--color-orange-500": "249 115 22",
    "--color-orange-600": "234 88 12",
    "--color-orange-700": "194 65 12",
    "--color-orange-800": "154 52 18",
    "--color-orange-900": "124 45 18",
    "--color-red-50": "254 242 242",
    "--color-red-100": "254 226 226",
    "--color-red-200": "254 202 202",
    "--color-red-300": "252 165 165",
    "--color-red-400": "248 113 113",
    "--color-red-500": "239 68 68",
    "--color-red-600": "220 38 38",
    "--color-red-700": "185 28 28",
    "--color-red-800": "153 27 27",
    "--color-red-900": "127 29 29",
    "--color-warmGray-50": "250 250 249",
    "--color-warmGray-100": "245 245 244",
    "--color-warmGray-200": "231 229 228",
    "--color-warmGray-300": "214 211 209",
    "--color-warmGray-400": "168 162 158",
    "--color-warmGray-500": "120 113 108",
    "--color-warmGray-600": "87 83 78",
    "--color-warmGray-700": "68 64 60",
    "--color-warmGray-800": "41 37 36",
    "--color-warmGray-900": "28 25 23",
    "--color-trueGray-50": "250 250 250",
    "--color-trueGray-100": "245 245 245",
    "--color-trueGray-200": "229 229 229",
    "--color-trueGray-300": "212 212 212",
    "--color-trueGray-400": "163 163 163",
    "--color-trueGray-500": "115 115 115",
    "--color-trueGray-600": "82 82 82",
    "--color-trueGray-700": "64 64 64",
    "--color-trueGray-800": "38 38 38",
    "--color-trueGray-900": "23 23 23",
    "--color-coolGray-50": "249 250 251",
    "--color-coolGray-100": "243 244 246",
    "--color-coolGray-200": "229 231 235",
    "--color-coolGray-300": "209 213 219",
    "--color-coolGray-400": "156 163 175",
    "--color-coolGray-500": "107 114 128",
    "--color-coolGray-600": "75 85 99",
    "--color-coolGray-700": "55 65 81",
    "--color-coolGray-800": "31 41 55",
    "--color-coolGray-900": "17 24 39",
    "--color-blueGray-50": "248 250 252",
    "--color-blueGray-100": "241 245 249",
    "--color-blueGray-200": "226 232 240",
    "--color-blueGray-300": "203 213 225",
    "--color-blueGray-400": "148 163 184",
    "--color-blueGray-500": "100 116 139",
    "--color-blueGray-600": "71 85 105",
    "--color-blueGray-700": "51 65 85",
    "--color-blueGray-800": "30 41 59",
    "--color-blueGray-900": "15 23 42",
    "--color-light-50": "250 250 249",
    "--color-light-100": "245 245 244",
    "--color-light-200": "231 229 228",
    "--color-light-300": "214 211 209",
    "--color-light-400": "168 162 158",
    "--color-light-500": "120 113 108",
    "--color-light-600": "87 83 78",
    "--color-light-700": "68 64 60",
    "--color-light-800": "41 37 36",
    "--color-light-900": "28 25 23",
    "--color-textLight-0": "252 252 252",
    "--color-textLight-50": "245 245 245",
    "--color-textLight-100": "229 229 229",
    "--color-textLight-200": "219 219 219",
    "--color-textLight-300": "212 212 212",
    "--color-textLight-400": "163 163 163",
    "--color-textLight-500": "140 140 140",
    "--color-textLight-600": "115 115 115",
    "--color-textLight-700": "82 82 82",
    "--color-textLight-800": "64 64 64",
    "--color-textLight-900": "38 38 38",
    "--color-textLight-950": "23 23 23",
    "--color-textDark-0": "252 252 252",
    "--color-textDark-50": "245 245 245",
    "--color-textDark-100": "229 229 229",
    "--color-textDark-200": "219 219 219",
    "--color-textDark-300": "212 212 212",
    "--color-textDark-400": "163 163 163",
    "--color-textDark-500": "140 140 140",
    "--color-textDark-600": "115 115 115",
    "--color-textDark-700": "82 82 82",
    "--color-textDark-800": "64 64 64",
    "--color-textDark-900": "38 38 38",
    "--color-textDark-950": "23 23 23",
    "--color-borderDark-0": "252 252 252",
    "--color-borderDark-50": "245 245 245",
    "--color-borderDark-100": "229 229 229",
    "--color-borderDark-200": "219 219 219",
    "--color-borderDark-300": "212 212 212",
    "--color-borderDark-400": "163 163 163",
    "--color-borderDark-500": "140 140 140",
    "--color-borderDark-600": "115 115 115",
    "--color-borderDark-700": "82 82 82",
    "--color-borderDark-800": "64 64 64",
    "--color-borderDark-900": "38 38 38",
    "--color-borderDark-950": "23 23 23",
    "--color-borderLight-0": "252 252 252",
    "--color-borderLight-50": "245 245 245",
    "--color-borderLight-100": "229 229 229",
    "--color-borderLight-200": "219 219 219",
    "--color-borderLight-300": "212 212 212",
    "--color-borderLight-400": "163 163 163",
    "--color-borderLight-500": "140 140 140",
    "--color-borderLight-600": "115 115 115",
    "--color-borderLight-700": "82 82 82",
    "--color-borderLight-800": "64 64 64",
    "--color-borderLight-900": "38 38 38",
    "--color-borderLight-950": "23 23 23",
    "--color-backgroundDark-0": "252 252 252",
    "--color-backgroundDark-50": "245 245 245",
    "--color-backgroundDark-100": "241 241 241",
    "--color-backgroundDark-200": "219 219 219",
    "--color-backgroundDark-300": "212 212 212",
    "--color-backgroundDark-400": "163 163 163",
    "--color-backgroundDark-500": "140 140 140",
    "--color-backgroundDark-600": "115 115 115",
    "--color-backgroundDark-700": "82 82 82",
    "--color-backgroundDark-800": "64 64 64",
    "--color-backgroundDark-900": "38 38 38",
    "--color-backgroundDark-950": "23 23 23",
    "--color-backgroundLight-0": "252 252 252",
    "--color-backgroundLight-50": "245 245 245",
    "--color-backgroundLight-100": "241 241 241",
    "--color-backgroundLight-200": "219 219 219",
    "--color-backgroundLight-300": "212 212 212",
    "--color-backgroundLight-400": "163 163 163",
    "--color-backgroundLight-500": "140 140 140",
    "--color-backgroundLight-600": "115 115 115",
    "--color-backgroundLight-700": "82 82 82",
    "--color-backgroundLight-800": "64 64 64",
    "--color-backgroundLight-900": "38 38 38",
    "--color-backgroundLight-950": "23 23 23",
    "--color-backgroundLightError": "254 241 241",
    "--color-backgroundDarkError": "66 43 43",
    "--color-backgroundLightWarning": "255 244 235",
    "--color-backgroundDarkWarning": "65 47 35",
    "--color-backgroundLightSuccess": "237 252 242",
    "--color-backgroundDarkSuccess": "28 43 33",
    "--color-backgroundLightInfo": "235 248 254",
    "--color-backgroundDarkInfo": "26 40 46",
    "--color-backgroundLightMuted": "246 246 247",
    "--color-backgroundDarkMuted": "37 37 38",
    "--color-white": "255 255 255",
    "--color-black": "0 0 0",
  }),
  dark: vars({
    "--color-primary-0": "255 234 212",
    "--color-primary-50": "255 215 179",
    "--color-primary-100": "255 191 140",
    "--color-primary-200": "255 156 84",
    "--color-primary-300": "255 117 28",
    "--color-primary-400": "255 103 0",
    "--color-primary-500": "255 113 0",
    "--color-primary-600": "180 76 0",
    "--color-primary-700": "130 54 0",
    "--color-primary-800": "81 33 0",
    "--color-primary-900": "56 22 0",
    "--color-primary-950": "17 7 0",

    /* Secondary  */
    "--color-secondary-0": "252 252 252",
    "--color-secondary-50": "240 240 240",
    "--color-secondary-100": "230 230 230",
    "--color-secondary-200": "210 210 210",
    "--color-secondary-300": "190 190 190",
    "--color-secondary-400": "170 170 170",
    "--color-secondary-500": "150 150 150",
    "--color-secondary-600": "130 130 130",
    "--color-secondary-700": "110 110 110",
    "--color-secondary-800": "90 90 90",
    "--color-secondary-900": "70 70 70",
    "--color-secondary-950": "50 50 50",

    /* Tertiary */
    "--color-tertiary-0": "222 240 255",
    "--color-tertiary-50": "222 240 255",
    "--color-tertiary-100": "175 207 255",
    "--color-tertiary-200": "125 175 255",
    "--color-tertiary-300": "75 143 255",
    "--color-tertiary-400": "26 111 255",
    "--color-tertiary-500": "0 86 230",
    "--color-tertiary-600": "0 67 180",
    "--color-tertiary-700": "0 48 130",
    "--color-tertiary-800": "0 29 81",
    "--color-tertiary-900": "0 10 33",
    "--color-tertiary-950": "0 10 33",
    /* Error */
    "--color-error-0": "83 19 19",

    "--color-error-50": "254 226 226",
    "--color-error-100": "254 202 202",
    "--color-error-200": "252 165 165",
    "--color-error-300": "248 113 113",
    "--color-error-400": "239 68 68",
    "--color-error-500": "230 53 53",
    "--color-error-600": "220 38 38",
    "--color-error-700": "185 28 28",
    "--color-error-800": "127 29 29",
    "--color-error-900": "153 27 27",
    "--color-error-950": "34 8 8",

    /* Success */
    "--color-success-0": "228 255 244",

    "--color-success-50": "202 255 232",
    "--color-success-100": "162 241 192",
    "--color-success-200": "132 211 162",
    "--color-success-300": "102 181 132",
    "--color-success-400": "72 151 102",
    "--color-success-500": "52 131 82",
    "--color-success-600": "42 121 72",
    "--color-success-700": "32 111 62",
    "--color-success-800": "22 101 52",
    "--color-success-900": "20 83 45",
    "--color-success-950": "7 31 17",

    /* Warning */
    "--color-warning-0": "84 45 18",

    "--color-warning-50": "255 247 237",
    "--color-warning-100": "255 237 213",
    "--color-warning-200": "254 215 170",
    "--color-warning-300": "253 186 116",
    "--color-warning-400": "251 146 60",
    "--color-warning-500": "249 115 22",
    "--color-warning-600": "234 88 12",
    "--color-warning-700": "194 65 12",
    "--color-warning-800": "154 52 18",
    "--color-warning-900": "124 45 18",
    "--color-warning-950": "255 253 251",

    /* Info */
    "--color-info-0": "3 38 56",

    "--color-info-50": "240 249 255",
    "--color-info-100": "224 242 254",
    "--color-info-200": "186 230 253",
    "--color-info-300": "125 211 252",
    "--color-info-400": "56 189 248",
    "--color-info-500": "14 165 233",
    "--color-info-600": "2 132 199",
    "--color-info-700": "3 105 161",
    "--color-info-800": "7 89 133",
    "--color-info-900": "12 74 110",
    "--color-info-950": "236 248 254",

    /* Typography */
    "--color-typography-50": "255 255 255",
    "--color-typography-100": "250 250 250",
    "--color-typography-200": "245 245 245",
    "--color-typography-300": "240 240 240",
    "--color-typography-400": "235 235 235",
    "--color-typography-500": "230 230 230",
    "--color-typography-600": "225 225 225",
    "--color-typography-700": "220 220 220",
    "--color-typography-800": "215 215 215",
    "--color-typography-900": "210 210 210",
    "--color-typography-950": "205 205 205",

    /* Outline */
    "--color-outline-0": "26 23 23",

    "--color-outline-50": "39 38 36",
    "--color-outline-100": "65 65 65",
    "--color-outline-200": "83 82 82",
    "--color-outline-300": "115 116 116",
    "--color-outline-400": "140 141 141",
    "--color-outline-500": "165 163 163",
    "--color-outline-600": "211 211 211",
    "--color-outline-700": "221 220 219",
    "--color-outline-800": "230 230 230",
    "--color-outline-900": "243 243 243",
    "--color-outline-950": "253 254 254",

    /* Background */
    "--color-background-0": "18 18 18",

    "--color-background-50": "39 38 37",
    "--color-background-100": "65 64 64",
    "--color-background-200": "83 82 82",
    "--color-background-300": "116 116 116",
    "--color-background-400": "142 142 142",
    "--color-background-500": "162 163 163",
    "--color-background-600": "213 212 212",
    "--color-background-700": "220 219 219",
    "--color-background-800": "242 241 241",
    "--color-background-900": "246 246 246",
    "--color-background-950": "254 254 254",

    /* Background Special */
    "--color-background-error": "66 43 43",

    "--color-background-warning": "65 47 35",
    "--color-background-success": "28 43 33",
    "--color-background-muted": "51 51 51",
    "--color-background-info": "26 40 46",

    /* Focus Ring Indicator  */
    "--color-indicator-primary": "247 247 247",

    "--color-indicator-info": "161 199 245",
    "--color-indicator-error": "232 70 69",
    "--color-rose-50": "255 241 242",
    "--color-rose-100": "255 228 230",
    "--color-rose-200": "254 205 211",
    "--color-rose-300": "253 164 175",
    "--color-rose-400": "251 113 133",
    "--color-rose-500": "244 63 94",
    "--color-rose-600": "225 29 72",
    "--color-rose-700": "190 18 60",
    "--color-rose-800": "159 18 57",
    "--color-rose-900": "136 19 55",
    "--color-pink-50": "253 242 248",
    "--color-pink-100": "252 231 243",
    "--color-pink-200": "251 207 232",
    "--color-pink-300": "249 168 212",
    "--color-pink-400": "244 114 182",
    "--color-pink-500": "236 72 153",
    "--color-pink-600": "219 39 119",
    "--color-pink-700": "190 24 93",
    "--color-pink-800": "157 23 77",
    "--color-pink-900": "131 24 67",
    "--color-fuchsia-50": "253 244 255",
    "--color-fuchsia-100": "250 232 255",
    "--color-fuchsia-200": "245 208 254",
    "--color-fuchsia-300": "240 171 252",
    "--color-fuchsia-400": "232 121 249",
    "--color-fuchsia-500": "217 70 239",
    "--color-fuchsia-600": "192 38 211",
    "--color-fuchsia-700": "162 28 175",
    "--color-fuchsia-800": "134 25 143",
    "--color-fuchsia-900": "112 26 117",
    "--color-purple-50": "250 245 255",
    "--color-purple-100": "243 232 255",
    "--color-purple-200": "233 213 255",
    "--color-purple-300": "216 180 254",
    "--color-purple-400": "192 132 252",
    "--color-purple-500": "168 85 247",
    "--color-purple-600": "147 51 234",
    "--color-purple-700": "126 34 206",
    "--color-purple-800": "107 33 168",
    "--color-purple-900": "88 28 135",
    "--color-violet-50": "245 243 255",
    "--color-violet-100": "237 233 254",
    "--color-violet-200": "221 214 254",
    "--color-violet-300": "196 181 253",
    "--color-violet-400": "167 139 250",
    "--color-violet-500": "139 92 246",
    "--color-violet-600": "124 58 237",
    "--color-violet-700": "109 40 217",
    "--color-violet-800": "91 33 182",
    "--color-violet-900": "76 29 149",
    "--color-indigo-50": "238 242 255",
    "--color-indigo-100": "224 231 255",
    "--color-indigo-200": "199 210 254",
    "--color-indigo-300": "165 180 252",
    "--color-indigo-400": "129 140 248",
    "--color-indigo-500": "99 102 241",
    "--color-indigo-600": "79 70 229",
    "--color-indigo-700": "67 56 202",
    "--color-indigo-800": "55 48 163",
    "--color-indigo-900": "49 46 129",
    "--color-blue-50": "239 246 255",
    "--color-blue-100": "219 234 254",
    "--color-blue-200": "191 219 254",
    "--color-blue-300": "147 197 253",
    "--color-blue-400": "96 165 250",
    "--color-blue-500": "59 130 246",
    "--color-blue-600": "37 99 235",
    "--color-blue-700": "29 78 216",
    "--color-blue-800": "30 64 175",
    "--color-blue-900": "30 58 138",
    "--color-lightBlue-50": "240 249 255",
    "--color-lightBlue-100": "224 242 254",
    "--color-lightBlue-200": "186 230 253",
    "--color-lightBlue-300": "125 211 252",
    "--color-lightBlue-400": "56 189 248",
    "--color-lightBlue-500": "14 165 233",
    "--color-lightBlue-600": "2 132 199",
    "--color-lightBlue-700": "3 105 161",
    "--color-lightBlue-800": "7 89 133",
    "--color-lightBlue-900": "12 74 110",
    "--color-darkBlue-50": "219 244 255",
    "--color-darkBlue-100": "173 219 255",
    "--color-darkBlue-200": "124 194 255",
    "--color-darkBlue-300": "74 169 255",
    "--color-darkBlue-400": "26 145 255",
    "--color-darkBlue-500": "0 119 230",
    "--color-darkBlue-600": "0 93 180",
    "--color-darkBlue-700": "0 66 130",
    "--color-darkBlue-800": "0 40 81",
    "--color-darkBlue-900": "0 14 33",
    "--color-cyan-50": "236 254 255",
    "--color-cyan-100": "207 250 254",
    "--color-cyan-200": "165 243 252",
    "--color-cyan-300": "103 232 249",
    "--color-cyan-400": "34 211 238",
    "--color-cyan-500": "6 182 212",
    "--color-cyan-600": "8 145 178",
    "--color-cyan-700": "14 116 144",
    "--color-cyan-800": "21 94 117",
    "--color-cyan-900": "22 78 99",
    "--color-teal-50": "240 253 250",
    "--color-teal-100": "204 251 241",
    "--color-teal-200": "153 246 228",
    "--color-teal-300": "94 234 212",
    "--color-teal-400": "45 212 191",
    "--color-teal-500": "20 184 166",
    "--color-teal-600": "13 148 136",
    "--color-teal-700": "15 118 110",
    "--color-teal-800": "17 94 89",
    "--color-teal-900": "19 78 74",
    "--color-emerald-50": "236 253 245",
    "--color-emerald-100": "209 250 229",
    "--color-emerald-200": "167 243 208",
    "--color-emerald-300": "110 231 183",
    "--color-emerald-400": "52 211 153",
    "--color-emerald-500": "16 185 129",
    "--color-emerald-600": "5 150 105",
    "--color-emerald-700": "4 120 87",
    "--color-emerald-800": "6 95 70",
    "--color-emerald-900": "6 78 59",
    "--color-green-50": "240 253 244",
    "--color-green-100": "220 252 231",
    "--color-green-200": "187 247 208",
    "--color-green-300": "134 239 172",
    "--color-green-400": "74 222 128",
    "--color-green-500": "34 197 94",
    "--color-green-600": "22 163 74",
    "--color-green-700": "21 128 61",
    "--color-green-800": "22 101 52",
    "--color-green-900": "20 83 45",
    "--color-lime-50": "247 254 231",
    "--color-lime-100": "236 252 203",
    "--color-lime-200": "217 249 157",
    "--color-lime-300": "190 242 100",
    "--color-lime-400": "163 230 53",
    "--color-lime-500": "132 204 22",
    "--color-lime-600": "101 163 13",
    "--color-lime-700": "77 124 15",
    "--color-lime-800": "63 98 18",
    "--color-lime-900": "54 83 20",
    "--color-yellow-50": "254 252 232",
    "--color-yellow-100": "254 249 195",
    "--color-yellow-200": "254 240 138",
    "--color-yellow-300": "253 224 71",
    "--color-yellow-400": "250 204 21",
    "--color-yellow-500": "234 179 8",
    "--color-yellow-600": "202 138 4",
    "--color-yellow-700": "161 98 7",
    "--color-yellow-800": "133 77 14",
    "--color-yellow-900": "113 63 18",
    "--color-amber-50": "255 251 235",
    "--color-amber-100": "254 243 199",
    "--color-amber-200": "253 230 138",
    "--color-amber-300": "252 211 77",
    "--color-amber-400": "251 191 36",
    "--color-amber-500": "245 158 11",
    "--color-amber-600": "217 119 6",
    "--color-amber-700": "180 83 9",
    "--color-amber-800": "146 64 14",
    "--color-amber-900": "120 53 15",
    "--color-orange-50": "255 247 237",
    "--color-orange-100": "255 237 213",
    "--color-orange-200": "254 215 170",
    "--color-orange-300": "253 186 116",
    "--color-orange-400": "251 146 60",
    "--color-orange-500": "249 115 22",
    "--color-orange-600": "234 88 12",
    "--color-orange-700": "194 65 12",
    "--color-orange-800": "154 52 18",
    "--color-orange-900": "124 45 18",
    "--color-red-50": "254 242 242",
    "--color-red-100": "254 226 226",
    "--color-red-200": "254 202 202",
    "--color-red-300": "252 165 165",
    "--color-red-400": "248 113 113",
    "--color-red-500": "239 68 68",
    "--color-red-600": "220 38 38",
    "--color-red-700": "185 28 28",
    "--color-red-800": "153 27 27",
    "--color-red-900": "127 29 29",
    "--color-warmGray-50": "250 250 249",
    "--color-warmGray-100": "245 245 244",
    "--color-warmGray-200": "231 229 228",
    "--color-warmGray-300": "214 211 209",
    "--color-warmGray-400": "168 162 158",
    "--color-warmGray-500": "120 113 108",
    "--color-warmGray-600": "87 83 78",
    "--color-warmGray-700": "68 64 60",
    "--color-warmGray-800": "41 37 36",
    "--color-warmGray-900": "28 25 23",
    "--color-trueGray-50": "250 250 250",
    "--color-trueGray-100": "245 245 245",
    "--color-trueGray-200": "229 229 229",
    "--color-trueGray-300": "212 212 212",
    "--color-trueGray-400": "163 163 163",
    "--color-trueGray-500": "115 115 115",
    "--color-trueGray-600": "82 82 82",
    "--color-trueGray-700": "64 64 64",
    "--color-trueGray-800": "38 38 38",
    "--color-trueGray-900": "23 23 23",
    "--color-coolGray-50": "249 250 251",
    "--color-coolGray-100": "243 244 246",
    "--color-coolGray-200": "229 231 235",
    "--color-coolGray-300": "209 213 219",
    "--color-coolGray-400": "156 163 175",
    "--color-coolGray-500": "107 114 128",
    "--color-coolGray-600": "75 85 99",
    "--color-coolGray-700": "55 65 81",
    "--color-coolGray-800": "31 41 55",
    "--color-coolGray-900": "17 24 39",
    "--color-blueGray-50": "248 250 252",
    "--color-blueGray-100": "241 245 249",
    "--color-blueGray-200": "226 232 240",
    "--color-blueGray-300": "203 213 225",
    "--color-blueGray-400": "148 163 184",
    "--color-blueGray-500": "100 116 139",
    "--color-blueGray-600": "71 85 105",
    "--color-blueGray-700": "51 65 85",
    "--color-blueGray-800": "30 41 59",
    "--color-blueGray-900": "15 23 42",
    "--color-light-50": "250 250 249",
    "--color-light-100": "245 245 244",
    "--color-light-200": "231 229 228",
    "--color-light-300": "214 211 209",
    "--color-light-400": "168 162 158",
    "--color-light-500": "120 113 108",
    "--color-light-600": "87 83 78",
    "--color-light-700": "68 64 60",
    "--color-light-800": "41 37 36",
    "--color-light-900": "28 25 23",
    "--color-textLight-0": "252 252 252",
    "--color-textLight-50": "245 245 245",
    "--color-textLight-100": "229 229 229",
    "--color-textLight-200": "219 219 219",
    "--color-textLight-300": "212 212 212",
    "--color-textLight-400": "163 163 163",
    "--color-textLight-500": "140 140 140",
    "--color-textLight-600": "115 115 115",
    "--color-textLight-700": "82 82 82",
    "--color-textLight-800": "64 64 64",
    "--color-textLight-900": "38 38 38",
    "--color-textLight-950": "23 23 23",
    "--color-textDark-0": "252 252 252",
    "--color-textDark-50": "245 245 245",
    "--color-textDark-100": "229 229 229",
    "--color-textDark-200": "219 219 219",
    "--color-textDark-300": "212 212 212",
    "--color-textDark-400": "163 163 163",
    "--color-textDark-500": "140 140 140",
    "--color-textDark-600": "115 115 115",
    "--color-textDark-700": "82 82 82",
    "--color-textDark-800": "64 64 64",
    "--color-textDark-900": "38 38 38",
    "--color-textDark-950": "23 23 23",
    "--color-borderDark-0": "252 252 252",
    "--color-borderDark-50": "245 245 245",
    "--color-borderDark-100": "229 229 229",
    "--color-borderDark-200": "219 219 219",
    "--color-borderDark-300": "212 212 212",
    "--color-borderDark-400": "163 163 163",
    "--color-borderDark-500": "140 140 140",
    "--color-borderDark-600": "115 115 115",
    "--color-borderDark-700": "82 82 82",
    "--color-borderDark-800": "64 64 64",
    "--color-borderDark-900": "38 38 38",
    "--color-borderDark-950": "23 23 23",
    "--color-borderLight-0": "252 252 252",
    "--color-borderLight-50": "245 245 245",
    "--color-borderLight-100": "229 229 229",
    "--color-borderLight-200": "219 219 219",
    "--color-borderLight-300": "212 212 212",
    "--color-borderLight-400": "163 163 163",
    "--color-borderLight-500": "140 140 140",
    "--color-borderLight-600": "115 115 115",
    "--color-borderLight-700": "82 82 82",
    "--color-borderLight-800": "64 64 64",
    "--color-borderLight-900": "38 38 38",
    "--color-borderLight-950": "23 23 23",
    "--color-backgroundDark-0": "252 252 252",
    "--color-backgroundDark-50": "245 245 245",
    "--color-backgroundDark-100": "241 241 241",
    "--color-backgroundDark-200": "219 219 219",
    "--color-backgroundDark-300": "212 212 212",
    "--color-backgroundDark-400": "163 163 163",
    "--color-backgroundDark-500": "140 140 140",
    "--color-backgroundDark-600": "115 115 115",
    "--color-backgroundDark-700": "82 82 82",
    "--color-backgroundDark-800": "64 64 64",
    "--color-backgroundDark-900": "38 38 38",
    "--color-backgroundDark-950": "23 23 23",
    "--color-backgroundLight-0": "252 252 252",
    "--color-backgroundLight-50": "245 245 245",
    "--color-backgroundLight-100": "241 241 241",
    "--color-backgroundLight-200": "219 219 219",
    "--color-backgroundLight-300": "212 212 212",
    "--color-backgroundLight-400": "163 163 163",
    "--color-backgroundLight-500": "140 140 140",
    "--color-backgroundLight-600": "115 115 115",
    "--color-backgroundLight-700": "82 82 82",
    "--color-backgroundLight-800": "64 64 64",
    "--color-backgroundLight-900": "38 38 38",
    "--color-backgroundLight-950": "23 23 23",
    "--color-backgroundLightError": "254 241 241",
    "--color-backgroundDarkError": "66 43 43",
    "--color-backgroundLightWarning": "255 244 235",
    "--color-backgroundDarkWarning": "65 47 35",
    "--color-backgroundLightSuccess": "237 252 242",
    "--color-backgroundDarkSuccess": "28 43 33",
    "--color-backgroundLightInfo": "235 248 254",
    "--color-backgroundDarkInfo": "26 40 46",
    "--color-backgroundLightMuted": "246 246 247",
    "--color-backgroundDarkMuted": "37 37 38",
    "--color-white": "255 255 255",
    "--color-black": "0 0 0",
  }),
};
