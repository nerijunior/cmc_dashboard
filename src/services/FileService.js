class FileService {
  constructor () {
    this.baseUrl = 'https://raw.githubusercontent.com/nerijunior/camara_municipal_curitiba/master/data/'
  }

  getEntityFileByGrupoId (id) {
    const ano = '2017/'

    let file = ''

    switch (id) {
      case 1:
        file = 'vereadores.json'
        break
      case 2:
        file = 'efetivos.json'
        break
      case 3:
        file = 'comissionados.json'
        break
      case 4:
        file = 'inativos.json'
        break
      case 5:
        file = 'ouvidor.json'
        break
      case 6:
        file = 'cedido_para_camara.json'
        break
      case 7:
        file = 'cedido_pela_camara.json'
        break
      case 8:
        file = 'temporario.json'
        break
      case 9:
        file = 'estagiarios.json'
        break
    }

    const url = `${this.baseUrl}${ano}${file}`
    return url
  }
}

export default new FileService()
