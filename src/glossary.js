const words = [
  {
    definition:
      'shall refer to the Albuquerque Police Department and its agents, officers, supervisors, and employees (both sworn and unsworn).',
    term: 'APD'
  },
  {
    definition:
      "refers jointly to the United States Department of Justice's Civil Rights Division and the United States Attorney's Office for the District of New Mexico.",
    term: 'Department of Justice'
  },
  {
    definition:
      'shall refer to the Albuquerque Police Department and its agents, officers, supervisors, and employees (both sworn and unsworn).',
    term: 'the department'
  },
  {
    definition:
      'shall refer to the City of Albuquerque, including its agents, officers, and employees.',
    term: 'city'
  },
  {
    definition:
      'shall refer to the United States District Judge for the District of New Mexico presiding over this case.',
    term: 'court'
  },
  {
    definition:
      'is the taking of one person into custody by another. To constitute arrest there must be an actual restraint of the person. The restraint may be imposed by force or may result from the submission of the person arrested to the custody of the one arresting the person. An arrest is a restraint of greater scope or duration than an investigatory stop or detention. An arrest is lawful when supported by probable cause.',
    term: 'arrest'
  },
  {
    definition: 'does not include any allegation of employment discrimination.',
    term: 'complaint'
  },
  {
    definition:
      'means the contact and delivery of an electrical impulse to a subject with an Electronic Control Weapon.',
    term: 'ECW application'
  },
  {
    definition:
      "means Electronic Control Weapon, a weapon, including those manufactured by TASER International, designed primarily to discharge electrical charges into a subject that will cause involuntary muscle contractions and override the subject's voluntary motor responses.",
    term: 'ECW'
  },
  {
    definition:
      'means a pistol, revolver, shotgun, carbine, or machine gun, as well as any instrument capable of discharging a bullet or shot.',
    term: 'firearm'
  },
  {
    definition:
      'means the development or putting into place of a policy or procedure, including the appropriate training of all relevant personnel, and the consistent and verified performance of that policy or procedure in actual practice.',
    term: 'implementation'
  },
  {
    definition:
      'means the development or putting into place of a policy or procedure, including the appropriate training of all relevant personnel, and the consistent and verified performance of that policy or procedure in actual practice.',
    term: 'implement'
  },
  {
    definition: 'mean "including, but not limited to."',
    term: 'include'
  },
  {
    definition: 'mean "including, but not limited to."',
    term: 'including'
  },
  {
    definition:
      'means any use of force likely to cause death or serious physical injury, including the use of a firearm, neck hold, or strike to the head, neck, or throat with a hard object.',
    term: 'lethal force'
  },
  {
    definition:
      'means an incident in which someone with an actual or perceived mental illness is experiencing intense feelings of personal distress (e.g., anxiety, depression, anger, fear, panic, hopelessness), obvious changes in functioning (e.g., neglect of personal hygiene, unusual behavior) or catastrophic life events (e.g., disruptions in personal relationships, support systems, or living arrangements; loss of autonomy or parental rights; victimization; or natural disasters), which may, but not necessarily, result in an upward trajectory of intensity culminating in thoughts or acts that are dangerous to his- or herself and/or others.',
    term: 'mental health crisis'
  },
  {
    definition:
      'is a medical condition that disrupts an individual\'s thinking, perception, mood, or ability to relate to others such that daily functioning and coping with the ordinary demands of life are diminished. Mental illness includes serious mental illnesses such as major depression, schizophrenia, bipolar disorder, obsessive compulsive disorder ("OCD"), panic disorder, post-traumatic stress disorder ("PTSD"), and borderline personality disorder. Mental illness includes individuals with dual diagnosis of mental illness and another condition, such as drug and/or alcohol addiction.',
    term: 'mental illness'
  },
  {
    definition:
      'is a medical condition that disrupts an individual\'s thinking, perception, mood, or ability to relate to others such that daily functioning and coping with the ordinary demands of life are diminished. Mental illness includes serious mental illnesses such as major depression, schizophrenia, bipolar disorder, obsessive compulsive disorder ("OCD"), panic disorder, post-traumatic stress disorder ("PTSD"), and borderline personality disorder. Mental illness includes individuals with dual diagnosis of mental illness and another condition, such as drug and/or alcohol addiction.',
    term: 'OCD'
  },
  {
    definition:
      'is a medical condition that disrupts an individual\'s thinking, perception, mood, or ability to relate to others such that daily functioning and coping with the ordinary demands of life are diminished. Mental illness includes serious mental illnesses such as major depression, schizophrenia, bipolar disorder, obsessive compulsive disorder ("OCD"), panic disorder, post-traumatic stress disorder ("PTSD"), and borderline personality disorder. Mental illness includes individuals with dual diagnosis of mental illness and another condition, such as drug and/or alcohol addiction.',
    term: 'PTSD'
  },
  {
    definition:
      "refers to one of the following types of holds: (1) carotid restraint hold; (2) a lateral vascular neck constraint; or (3) a hold with a knee or other object to a subject's neck. A neck hold shall be considered lethal force.",
    term: 'neck hold'
  },
  {
    definition: 'means all APD employees.',
    term: 'personnel'
  },
  {
    definition:
      'means force that a reasonable and trained supervisor would conclude could result in criminal charges due to the apparent circumstances of the use of force, such as the level of force used as compared to the resistance encountered, or discrepancies in the use of force as described by the officer and the use of force as evidenced by any resulting injuries, witness statements, or other evidence.',
    term: 'use of force indicating apparent criminal conduct by an officer'
  },
  {
    definition:
      'means any law enforcement agent employed by or volunteering for APD, including supervisors and reserve officers.',
    term: 'police officer'
  },
  {
    definition:
      'means any law enforcement agent employed by or volunteering for APD, including supervisors and reserve officers.',
    term: 'officer'
  },
  {
    definition:
      'means physical injury that creates a substantial risk of death; or that causes death or serious and protracted disfigurement; or impairment of the function of any bodily organ or limb.',
    term: 'serious physical injury'
  },
  {
    definition: 'means that the provision imposes a mandatory duty.',
    term: 'shall'
  },
  {
    definition:
      'means a designated law enforcement component with specialized training, skills, and mission. Specialized units include Specialized Tactical Units, whose focus is on tactical solutions to critical incidents that involve a threat to public safety or high-risk situations, which would otherwise exceed the capabilities of traditional law enforcement first responders or investigative units. Specialized Tactical Units include SWAT, the Canine Unit, and the Bomb Squad. Specialized units also include Specialized Investigation Units, whose focus is on the use of investigative methods and techniques to solve crimes and develop cases for prosecution, such as the Intelligence Unit and the Gang Unit.',
    term: 'specialized unit'
  },
  {
    definition:
      'means any designated organization of officers within APD, including area and specialized units.',
    term: 'unit'
  },
  {
    definition: 'unit means the Special Weapons and Tactics unit.',
    term: 'SWAT'
  },
  {
    definition:
      'means sworn APD personnel at the rank of sergeant or above (or anyone acting in those capacities) and non-sworn APD personnel with oversight responsibility for other personnel.',
    term: 'supervisor'
  },
  {
    definition:
      'means a written report documenting a use of force at Level 1 and above unresisted handcuffing; hand control or escort techniques applied for the purposes of handcuffing; or escorts that are not used as pressure point compliance techniques, do not result in injury or complaint of injury, and are not used to overcome resistance.. The Use of Force Report is comprised ofincludes a Use of Force Data Report and a Use of Force Narrative Report.',
    term: 'use of force report'
  },
  {
    definition:
      'in this Agreement is not intended to substitute or alter in any way the definition in the Memorandum of Understanding.',
    term: 'serious use of force'
  },
  {
    definition:
      'means physical effort to compel compliance by an unwilling subject above unresisted handcuffing, including pointing a firearm at a person. a show of force. APD uses of force will be divided into three levels of force. Each level of force will require increasingly vigorous reporting, investigation, and review.',
    term: 'use of force'
  },
  {
    definition: 'a subject with the laser sight.',
    term: 'show of force'
  },
  {
    definition:
      'means the Chief of Police of the Albuquerque Police Department or his or her properly designated Acting Chief.',
    term: 'chief'
  },
  {
    definition:
      "means resistance that poses a threat of harm to the officer or others, such as when a subject attempts to attack or does attack an officer; exhibits combative behavior (e.g., lunging toward the officer, striking the officer with hands, fists, kicks, or any instrument that may be perceived as a weapon such as a knife or stick); or attempts to leave the scene, flee, hide from detection, or pull away from the officer's grasp. Verbal statements alone do not constitute active resistance. Bracing or tensing alone ordinarily do not constitute active resistance, but may if they pose a threat of harm to the officer or others.",
    term: 'active resistance'
  },
  {
    definition:
      'means a force application not intended or expected to cause death or serious injury and which is commonly understood to have less potential for causing death or serious injury than conventional, more lethal police tactics. Use of less lethal force can nonetheless result in death or serious injury.',
    term: 'less lethal force'
  },
  {
    definition:
      'means a person or team of people who shall be jointly selected to monitor and report on the implementation of this Agreement.',
    term: 'monitor'
  },
  {
    definition:
      'means non-compliance with officer commands that is non- violent and does not pose an immediate threat to the officer or the public. Bracing, tensing, linking arms, or verbally signaling an intention to avoid or prevent being taken into custody constitute passive resistance.',
    term: 'passive resistance'
  },
  {
    definition:
      "refers jointly to the United States Department of Justice's Civil Rights Division and the United States Attorney's Office for the District of New Mexico.",
    term: 'DOJ'
  },
  {
    definition:
      "means the United States Attorney's Office for the District of New Mexico.",
    term: 'USAO'
  },
  {
    definition:
      'means the arrest, capture, or taking into custody of a person.',
    term: 'apprehension'
  },
  {
    definition:
      'shall refer to police service areas of APD located throughout Albuquerque that are led through the chain of command by an Area Commander.',
    term: 'area commands'
  },
  {
    definition:
      'means guidelines or standards that represent the most efficient and current means for achieving constitutional and effective policing accepted by nationally recognized police professionals or organizations in the relevant subject area, as determined by the Parties.',
    term: 'best practices'
  },
  {
    definition:
      'shall refer to any non-sworn personnel employed by APD, on either a temporary or permanent basis, in either a paid or unpaid capacity.',
    term: 'civilian employee'
  },
  {
    definition:
      'means any person, including an APD officer or employee, who makes a complaint against APD or an APD officer or employee.',
    term: 'complainant'
  },
  {
    definition:
      'means a discharge of a firearm by an APD officer, including accidental discharges and discharges where no person is struck. Range and training firings, destruction of animals, and off-duty hunting discharges where no person is struck are not critical firearms discharges.',
    term: 'critical firearm discharge'
  },
  {
    definition:
      'means race, ethnicity, age, sex, gender expression or gender identity, sexual orientation, and limited English proficiency, if known.',
    term: 'demographic category'
  },
  {
    definition:
      'means a personnel action for violation of an established law, regulation, rule, administrative rule, or APD policy, including, but not limited to, a verbal reprimand, written reprimand, suspension, or dismissal.',
    term: 'discipline'
  },
  {
    definition:
      'means a personnel action for violation of an established law, regulation, rule, administrative rule, or APD policy, including, but not limited to, a verbal reprimand, written reprimand, suspension, or dismissal.',
    term: 'disciplinary action'
  },
  {
    definition:
      'means the day this Agreement has been signed by the Parties and submitted to the Court.',
    term: 'effective date'
  },
  {
    definition:
      'includes questioning for the purpose of eliciting facts or information.',
    term: 'interview'
  },
  {
    definition:
      'means a violation of departmental policies or procedures; violation of federal, state, or local criminal laws; constitutional violations, whether criminal or civil; violation of personnel rules; violation of the merit systems ordinance; violation of administrative rules; violation of regulations; and violation of the labor management relations laws.',
    term: 'misconduct'
  },
  {
    definition:
      'means written regulations or directives, regardless of the name of the regulation or directive, describing the duties, functions, and obligations of APD personnel, and providing specific direction on how to fulfill those duties, functions, or obligations. These include general orders, special orders, policies, procedures, and standard operating procedures.',
    term: 'policies and procedures'
  },
  {
    definition:
      'means an individual with a minimum of masters-level education and training in psychiatry, psychology, counseling, social work, or psychiatric nursing, who is currently licensed in the State of New Mexico to deliver the mental health services he or she has undertaken to provide.',
    term: 'qualified mental health professional'
  },
  {
    definition:
      'means that force which is objectively reasonable under the circumstances and the minimum amount of force necessary to effect an arrest or protect the officer or other person.',
    term: 'reasonable force'
  },
  {
    definition:
      "occurs when an officer's words or actions convey to a reasonable person that he or she is not free to leave.",
    term: 'seizure'
  },
  {
    definition:
      'means any firearm issued or authorized by the Department for use by sworn personnel.',
    term: 'service firearm'
  },
  {
    definition: 'means that the provision imposes a mandatory duty.',
    term: 'agrees to'
  },
  {
    definition: 'a subject with the laser sight.',
    term: 'paint'
  },
  {
    definition: 'means dispatchers, 911 operators, and NCIC operators.',
    term: 'telecommunicators'
  },
  {
    definition:
      'means a response by an APD officer to a call for service that is unrelated to an allegation of criminal conduct, but is instead to determine whether a person requires assistance for a medical or mental health crisis.',
    term: 'welfare check'
  },
  {
    definition:
      'means the day this Agreement has been approved by the Court, which is June 2, 2015.',
    term: 'operational date'
  }
];

class Term {
  constructor(props) {
    this.elem = document.createElement('span');
    this.elem.setAttribute(
      'definition',
      props.definition ||
        words
          .filter(obj => obj.term.toLowerCase() === props.text.toLowerCase())
          .reduce((acc, obj) => `${obj.term} ${obj.definition}`, '')
    );
    this.elem.innerText = props.text;
    this.elem.classList.add('term');
  }
}

function replaceAll(target, search, replacement) {
  return target.replace(
    new RegExp(`(${search})(s?)`, 'gi'),
    `${replacement}$2`
  );
}
function replaceTerms(text) {
  for (const term of words) {
    text = replaceAll(text, term.term, btoa(term.term));
  }
  for (const term of words) {
    const t = new Term({ text: term.term });
    text = text.split(btoa(term.term)).join(t.elem.outerHTML);
  }

  const tmp = document.createElement('span');
  tmp.innerHTML = text;
  const termElems = tmp.querySelectorAll('.term');
  let timeout;
  for (const elem of termElems) {
    elem.addEventListener('click', e => {
      clearTimeout(timeout);
      const termHint = document.querySelector('.js-paragraph__term');
      termHint.classList.remove('paragraph__term--hidden');
      termHint.classList.add('paragraph__term--show');
      termHint.style.left = `${e.pageX + 10}px`;
      termHint.style.top = `${e.pageY - 45}px`;
      termHint.innerHTML = e.target.getAttribute('definition');
      timeout = setTimeout(() => {
        termHint.classList.remove('paragraph__term--show');
        termHint.classList.add('paragraph__term--hidden');
      }, 4000);
    });
  }
  return tmp;
}

export { replaceTerms, Term };
