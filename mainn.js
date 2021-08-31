"use strict";
{
  // 今日の年月日付の全情報
  const today = new Date();
  // 今日の年
  let year =today.getFullYear();
  // 今日の月
  let month = today.getMonth();
  // 今日の日にち
  let day = today.getDate();

  // 当月カレンダーに入る先月日付
  function calendarhead(){
    // 日数分の日付ナンバーの入れ箱
    const dates= [];
    // 末日を特定してその日付が何日かを取得　末日は次の月の日付０で-1日目を取得して月の末日を取得　注意日付だけは１スタートで月や秒は０スタート
    const lastdate =new Date(year,month + 1,0).getDate();
    // 月初めの曜日番号（０から）とそれを応用して先月のカレンダー表示日付数に
    const weeknunber =new Date(year,month,1).getDay();
    // カレンダーに入れる先月の日付ナンバーを取得
    for(let i = 0; i <= weeknunber - 1; i++){
      // datesに全日にちを文頭に代入
      dates.unshift({
        // 日にち
        day: lastdate - i,
        // todayかどうか
        istoday: false,
        // オパシティをつけるか
        isdisabled: true,
      });
    }
    // returnにすることで関数式にデータを代入。その後の計算等で使える様に
    return dates
  };

  // 当月の日付
  function calendarbody(){
    // 日数分の数字の入れ箱
    const dates= [];
    // 末日を特定してその日付が何日かを取得　末日は次の月の日付０で-1日目を取得して月の末日を取得　注意日付だけは１スタートで月や秒は０スタート
    const lastdate =new Date(year,month + 1,0).getDate();
    // 今月の数を取得
    for(let i = 1; i <= lastdate; i++){
      // datesに全日にちを文末に代入
      dates.push({
        // 日にち
        day: i,
        // todayかどうか
        istoday: false,
        // オパシティをつけるか
        isdisabled: false,
      });
    }

    if(year === today.getFullYear() && month === today.getMonth()){
      dates[day - 1].istoday = true;
    }

    // returnにすることで関数式にデータを代入。その後の計算等で使える様に
    return dates
  };

  // 当月カレンダーに入る来月の日付
  function calendartail(){
    // 日数分の数字の入れ箱
    const dates= [];
    // 末日を曜日ナンバーを取得し、応用して
    const lastdateweeknunber =new Date(year,month + 1,0).getDay();
    // カレンダーに入れる来月の日付ナンバーを文末に代入
    for(let i = 1; i <= 7 - lastdateweeknunber - 1; i++){
      // datesに全日にちを文末に代入
      dates.push({
        // 日にち
        day: i,
        // todayかどうか
        istoday: false,
        // オパシティをつけるか
        isdisabled: true,
      });
    }
    // returnにすることで関数式にデータを代入。その後の計算等で使える様に
    return dates
  };


  // 当月カレンダーまとめ
  function calenderall(){

    // tbodyの呼び出し
    const tbody = document.querySelector("tbody");
    // 1つ目の子要素を消去することで最新の月だけ表示　なぜか月がどれだけ変わろうと変わるまでに通った月も計算しているらしいので単発のifではなくwhile
    while(tbody.firstChild){
      tbody.removeChild(tbody.firstChild)
    }

    // titleを年/月になる様に表示　padstartで２桁に満たなければ１桁目に０を入れる。padstartが文字列でないと使えないのでStringで文字列化
    const newtitle = `${year}/${String(month + 1).padStart(2,"0")}`;
    document.getElementById("title").textContent = newtitle;

    // 日付まとめ
    const dates = [
      // ...スプレッド構文で関数式を結合
      ...calendarhead(),//先月
      ...calendarbody(),//今月
      ...calendartail(),//来月
    ]

    // 週分け日付入れ箱
    const weeks = []
    // 日付まとめの総数は先月来月を足してるので必ず７で割り切れるため週の数を７で割って出す
    const weekscount = dates.length / 7 
    // ループ文は０スタートのため週の数−１回ループさせる
    for(let i = 0;i <= weekscount - 1;i++){
      // spliceでdatesの０番目スタートで７番目を取得しない処理にして６番目までを順に取得してweeksに代入する
      weeks.push(dates.splice(0,7))
    }

    // 全ての週からそれぞれ全てに
    weeks.forEach(week => {
      // html形式のtr作成
      const tr =document.createElement("tr");
      // 週の全ての日に
      week.forEach(date => {
        // html形式のtd作成
        const td = document.createElement("td");

        // tdのテキストに各日付の数字を代入
        td.textContent = date.day;
        // todayがtrueだったら
        if(date.istoday){
          td.classList.add("today")
        }
        // disabledがtrueだったら
        if(date.isdisabled){
          td.classList.add("disabled")
        }

        // tdをtrの子要素に代入
        tr.appendChild(td);
      })
      // tbodyをhtmlから呼び出しtrを子要素に代入
      document.querySelector("tbody").appendChild(tr);
    })
  }


  calenderall();


  // 戻るボタンを押したときの処理
  document.getElementById("prev").addEventListener("click",()=>{
    month--
    // １月を超えたら
    if(month < 0){
      year--;
      month = 11;
    }
    calenderall();
  })
  // 次へボタンを押したときの処理
  document.getElementById("next").addEventListener("click",()=>{
    month++
    // １２月を超えたら
    if(month > 11){
      year++;
      month = 0;
    }
    calenderall();
  })

  // todayボタンを押したときの今月に戻る処理
  document.getElementById("today").addEventListener("click",()=>{
    // 今日の年
  year =today.getFullYear();
  // 今日の月
  month = today.getMonth();
    calenderall();
  })

}
